const express = require("express");
const app = express();
const mongoose = require("mongoose")
const Product = require("./models/productModel")
app.use(express.json())





//mongo integrating 
mongoose.connect('mongodb+srv://ajayjoji1723:KApQbJvFvda8OfbO@cluster0.xs7ouo1.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('DB Connected')
    app.listen(3001,()=>{
        console.log("Server Running at 3001")
    });
}).catch((error)=>{
    console.log(error)
})



//routes

//Add Product
app.post('/product', async (req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch(e){
        console.log(e.message)
        res.status(500).json({message:error.message})
    }
})

//GET All Products
app.get("/products", async(req,res)=>{
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//Single Product
app.get("/products/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//Update methode
app.put("/products/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:`Cannot find any product with product ID ${id}`})
        }
        const updatedproduct = await Product.findById(id);
        res.status(200).json(updatedproduct);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//DELETE product
app.delete("/products/:id", async(req,res)=>{
    try{
        const {id} = req.params
        
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`});

        }
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})