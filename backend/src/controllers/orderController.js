import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import bitcoinService from '../services/BitcoinService.js'
import { convertToBTC } from '../utils/currency.js';

export const createOrder = async (req, res) => {
  try {
    const { productIds, quantities } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!productIds || !quantities || productIds.length !== quantities.length) {
        return res.status(400).json({ error: 'Invalid product IDs or quantities' });
      }

    // Calculate total amount and verify products
    const products = await Product.findAll({
      where: { id: productIds }
    });

    if (products.length !== productIds.length) {
      const missingProducts = productIds.filter(id => !products.some(p => p.id === id));
      return res.status(404).json({
        error: 'Some products not found',
        missingProducts
      })
    }

    let totalAmount = 0;
    const orderItems = [];
    
    products.forEach((product, index) => {
      if (product.stock < quantities[index]) {
        throw new Error(`Insufficient stock for product ${product.productName}`);
      }
      
      totalAmount += product.price * quantities[index];
      orderItems.push({
        productId: product.id,
        quantity: quantities[index],
        price: product.price
      });
    });

    // Generate Bitcoin payment address and amount
    const { address } = bitcoinService.generateAddress();
    const bitcoinAmount = await convertToBTC(totalAmount) // Implement this function based on current exchange rate

    // Create the order
    const order = await Order.create({
      userId,
      bitcoinAmount,
      bitcoinAddress: address,
      status: 'pending'
    });

    // Add products to order
    await order.addProducts(orderItems.map(item => item.productId), {
      through: { 
        quantity: item.quantity,
        price: item.price 
      }
    });

    // Update product stock
    await Promise.all(products.map((product, index) => {
      return product.update({
        stock: product.stock - quantities[index]
      });
    }));

    res.status(201).json({
        message: "Order created successfully",
        order,
        paymentInstructions: {
            bitcoinAmount,
            bitcoinAddress: address,
            usdAmount: totalAmount
        }
    })
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ 
      error: error.message || 'Failed to create order',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'username', 'email'] },
        { model: Product, through: { attributes: ['quantity', 'price'] } }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Only allow the order owner or admin to view the order
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

export const processBitcoinPayment = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Verify order ownership
    if (order.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Check if payment was received
    const isPaid = await bitcoinService.checkTransaction(
      order.bitcoinAddress,
      order.bitcoinAmount
    );

    if (isPaid) {
      await order.update({ 
        status: 'paid',
        transactionHash: req.body.transactionHash || null
      });
      return res.json({ message: 'Payment confirmed', order });
    }

    res.status(400).json({ error: 'Payment not yet received' });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Failed to process payment' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Verify the requesting user is either the owner or admin
    if (userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const orders = await Order.findAll({
      where: { userId },
      include: [
        { model: Product, through: { attributes: ['quantity', 'price'] } }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

