const bodyParser = require('body-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');
const app= express();
const PORT = 8080
const cors= require('cors');
const router = express.Router();

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
require('./conn');

const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:String,
    image:String,
    stock:String,
    availablelity:String
});
const Product = mongoose.model("products", productSchema);

const getAllProducts = async (req, res)=>{
    let data= [];
    data=await Product.find({})
    res.status(200).json(data)
    
};
const addData= async  (req, res) => {
    console.log(req.body);
    const { name, description, price, image, stock, availability } = req.body;
     if (!name || !description || !price || !image|| !stock || !availability) {
       return res.status(422).json({ error: "please fill all fields properly" });
     }
    
    // Product.findOne({ name:name }).then((userExists) => {
    //   if (userExists) {
    //     return res.status(422).json({ error: "Product already exists" });
    //   } 
    // });
    const product = new Product({ name, description, price, image, stock, availability});
    //bycript
    product
      .save()
      .then(() => {
        res.status(201).json({ message: "Product registered succesfully" });
      })
      .catch((err) => res.status(500).json({ error: "Failed to register" }))
  
      .catch((err) => {
        console.log(err);
      });
  };
// const getAllProducts = async (req, res)=>{
//     const {name}=req.body;
//     const queryObject={};

//     if(name){
//         queryObject = name;
//     }
//     console.log(queryObject);
//     let data= [];
//     data=await Product.find(queryObject);
//     res.status(200).json(data)
// };


app.route('/getAllProducts').get(getAllProducts);
app.route('/addData').post(addData);
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})