const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    ProductName: { type: String },
    Description: { type: String },
    Price: { type: Number },
    UserName: { type: String },
    Email: { type: String },
    isActive: { type: Boolean, default: true },
    createAt: { type: Number, default: Date.now }
})

let ProductModel = mongoose.model('products', ProductSchema);


exports.addProduct = (product)=>{
       newProduct = ProductModel({
           ProductName : product.ProductName,
           Description: product.Description,
           Price: product.Price,
           UserName : product.UserName,
           Email: product.Email,
       })
       newProduct.save()      
}