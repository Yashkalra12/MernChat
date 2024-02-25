const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
const connectDB=require('./models/Connect');
const User=require('./models/User');
const jwt=require('jsonwebtoken');

 dotenv.config();
// mongoose.connect(process.env.MONGO_URL);
//console.log(process.env.MONGO_URL);

const app=express();
jwtSecret=process.env.JWT_SECRET;


app.get('/test', (req,res)=>{
    res.json("Test okay");
});

app.post('/register', async (req,res)=>{
    const {username, password}=req.body;
    const createdUser = await User.create({username,password});
    jwt.sign({userId: createdUser._id }, jwtSecret).then((err,token) =>{
        if(err) throw err;
        res.cookie('token',token).status(201).json('ok');
    } )
    res.json();
});

connectDB();
app.listen(4040);


