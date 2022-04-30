const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors")
const bodyparser = require("body-parser");
const { addProduct } = require('./product');
const read = require('body-parser/lib/read');
const firebase = require('firebase/storage');
const app = express();
app.use(bodyparser.json({ limit: "5000kb" }));
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors());

mongoose.connect('mongodb+srv://ubaidnadeem:ubaid12345@testdb.pnswp.mongodb.net/NEW_DB?retryWrites=true&w=majority');
let db = mongoose.connection;
db.on('error', function (error) {
    console.log(error)
})
db.on('open', function () {
    console.log('Connected to MOngoDB');
});



const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        default: false,
    },
    email: {
        type: String,
        default: false,
    },
    price: {
        type: Number,
        default: false,
    },
    ProductName: {
        type: String,
        default: false,
    },
    Discription: {
        type: String,
        default: false,
    },
    ImagePath: {
        type: String,
        default: false,
    },
    uid: {
        type: String,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        default: true,
    },

});

const ProductModel = mongoose.model('Products', ProductSchema);

app.post('/myads', (req, res) => {

    ProductModel.find({ uid: req.body.uid }, (eror, data) => {
        res.send(data);
    })
})

app.get('/getproducts', (req, res) => {

    ProductModel.find({ status: true }, (eror, data) => {
        res.send(data)
    })
});

app.post('/addproduct', (req, res) => {

    const Product = new ProductModel({
        ProductName: req.body.productname,
        Discription: req.body.discription,
        price: req.body.price,
        uid: req.body.uid,
        date: { type: Date, default: Date.now },
        Active: true,
        name: req.body.name,
        email: req.body.email,
        ImagePath: req.body.imagepath
    })


    Product.save(function (error, data) {
        console.log(error, data);
        res.send("Succesfully Added")

    });


});

app.post('/getproduct', (req, res) => {
    ProductModel.findOne({ _id: req.body.id }, (e, r) => {
        res.send(r)
    })
});
app.post('/editproduct', (req, res) => {
    ProductModel.updateOne({ _id: req.body.id }, { ProductName: req.body.productName, Discription: req.body.discription, price: req.body.price },(e, d)=> {
        console.log(e, d)
res.send(d)
    });
    console.log(req.body.id)
})

app.listen(process.env.PORT || "400");
