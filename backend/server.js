const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
// Enable CORS
app.use(cors({origin:['heroic-naiad-f94d27.netlify.app']}));

// Parse JSON bodies
app.use(express.json());
mongoose.pluralize(null);
//Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
// Connecting to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION).then(() => {
    console.log("Database is connected successfully")
  }).catch((err) => {
    console.log(err, "connect agala")
  })
//Creating registerToken Schema 
const registerTokenSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:{type:String,unique:true},
    password:String,
    phone:Number,
    character:String,
  });
//Creating the Model for registerTokenSchema
const registerTokenModel= mongoose.model("token", registerTokenSchema);
//Registeration Endpoint
app.post('/register',async(req,res)=>{
    const formData=new registerTokenModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    character: req.body.character,
    })
    await formData.save().then(()=>{
        res.send("Registered Successfuly")
    }).catch(()=>{
        res.send("Already a User")
    });
})
//Login 
app.get('/login',async(req,res)=>{
    const email=req.query.email
    const password=req.query.password;
    const formData=await registerTokenModel.findOne({email:email})
    if(!formData){
        res.send("User not found")
    }
    if(password===formData.password){
        res.send({message:'Login successful',character:formData.character})
    }
    else{
        res.send('Incorrect Password')

    }
})
//Creating Property Schema
const propertySchema=new mongoose.Schema({
    email:String,
    place:String,
    area:String,
    bedrooms:Number,
    bathrooms:Number,
    hospitals:Number,
    colleges:Number,
    likedBy:[{type:String}]
  });
//Creating Property Model
const propertyModel= mongoose.model("property", propertySchema);
//Endpoint to add new property
app.post('/add-property',async (req,res)=>{
    const propertyData=new propertyModel({
        email:req.body.email,
        place:req.body.place,
        area:req.body.area,
        bedrooms:req.body.bedrooms,
        bathrooms:req.body.bathrooms,
        hospitals:req.body.hospitals,
        colleges:req.body.colleges,
    })
    await propertyData.save();
    res.send("saved")
})
//Endpoint to get all the properties posted by you
app.get('/get-properties',async (req,res)=>{
    const {email}=req.query
    const propertyData=await propertyModel.find({email})
    res.send(propertyData)
})
//Endpoint to delete property
app.delete('/delete-property',async (req,res)=>{
    const {id}=req.query
    const {email}=req.query;
    const propertyData=await propertyModel.findByIdAndDelete(id)
    const data=await propertyModel.find({email})
    console.log(data)
    res.send(data)
})
//Endpoint to get only one property which the user wanted to edit
app.get('/get-one-property',async (req,res)=>{
    const {id}=req.query
    const propertyData=await propertyModel.findById(id)
    res.send(propertyData)
})

//Endpoint to save edited property (patch request)
app.patch('/save-edited-property',async (req,res)=>{
    const {id}=req.query
    const updatedValue={
        place:req.body.place,
        area:req.body.area,
        bedrooms:req.body.bedrooms,
        bathrooms:req.body.bathrooms,
        hospitals:req.body.hospitals,
        colleges:req.body.colleges,
    }
    const propertyData=await propertyModel.findByIdAndUpdate(id,updatedValue,{new:true})
    res.send(propertyData)
})
//Endpoint to get all the properties uploaded by every sellers
app.get('/get-all-property',async (req,res)=>{
    const propertyData=await propertyModel.find({})
    res.send(propertyData)
})
//Endpoint to get the profile information of the seller
app.get('/get-profile-info',async (req,res)=>{
    const email=req.query.email;
    const profileData=await registerTokenModel.findOne({email:email})
    res.send(profileData)
})
//Endpoint to filter the property based on areas or place 
app.get('/filtered-property',async (req,res)=>{
    const {filter}=req.query
    const filteredProperties=await propertyModel.find({$or: [
        { place: { $regex: filter, $options: "i" } },
        { area: { $regex: filter, $options: "i" } }
      ]})
    console.log(filteredProperties)
    
    if(filteredProperties.length===0){
        res.send('No Property in the searched place')
    }
    else{
        res.send(filteredProperties)
    }
})
//Handle likes
app.patch('/like-property',async (req,res)=>{
    const {email}=req.query
    const {id}=req.query
    const doc=await propertyModel.findOneAndUpdate({_id:id},{$addToSet:{likedBy:email}},{new:true})
    const upadtedDoc=await propertyModel.find({})
    console.log(doc)
    res.send(upadtedDoc)
})
//Handle unlikes
app.patch('/unlike-property',async (req,res)=>{
    const {email}=req.query
    const {id}=req.query
    const doc=await propertyModel.findOneAndUpdate({_id:id},{$pull:{likedBy:email}},{new:true})
    console.log(doc)
    const upadtedDoc=await propertyModel.find({})

    res.send(upadtedDoc)
})