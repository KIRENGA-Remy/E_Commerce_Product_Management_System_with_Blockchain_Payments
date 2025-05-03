import { sequelize } from '../config/database.js';
import ProductModel from './Product.js';
import UserModel from './User.js';
import OrderModel from './Order.js';
import OrderItemsModel from './OrderItems.js';

const Product = ProductModel(sequelize);
const User = UserModel(sequelize);
const Order = OrderModel(sequelize);
const OrderItems = OrderItemsModel(sequelize);

// Set up associations
Order.associate({ Product, User, OrderItems });
OrderItems.associate({ Product, Order });
User.associate?.({ Order }); // Optional chaining if User has associations

export {
  sequelize,
  Product,
  User,
  Order,
  OrderItems
};