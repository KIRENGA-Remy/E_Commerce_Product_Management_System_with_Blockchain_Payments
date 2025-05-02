// import express from 'express'
// import Product from '../models/product';

// const create_product = async (req, res) => {
//     try {
//         const {product_name, imageUrl, price, stock, description} = req.body;

//         const newProduct = new Product({
//             product_name, 
//             imageUrl, 
//             price, 
//             stock, 
//             description
//         })
//         const product = await newProduct.save()
//         res.status(201).json({ message: "Product created successfully"})
//     } catch (err) {
        
//     }
// }