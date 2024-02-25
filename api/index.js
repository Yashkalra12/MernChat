const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
const connectDB=require('./models/Connect');
const User=require('./models/User');
const jwt=require('jsonwebtoken');
const cors=require('cors');

 dotenv.config();
// mongoose.connect(process.env.MONGO_URL);
//console.log(process.env.MONGO_URL);
jwtSecret=process.env.JWT_SECRET;

const app=express();
app.use(express.json());

// app.use(cors({
//     credentials:true,
//     origin:'*',
//     methods:['GET','POST','PUT','DELETE']
//     }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });


app.get('/test', (req,res)=>{
    res.json("Test okay");
});

app.post('/register', async (req,res)=>{
    const {username, password}=req.body;
    try{
        const createdUser = await User.create({username,password});
        jwt.sign({userId: createdUser._id }, jwtSecret,{},(err,token) =>{
            if(err) throw err;
            res.cookie('token',token).status(201).json({
                _id: createdUser._id,

            });
        });
    }
        catch(err){
            if(err) throw err;
            res.status(500).json('error');
        }
    }
    

);


connectDB();
app.listen(4040);


