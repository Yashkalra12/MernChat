const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
const connectDB=require('./models/Connect');
const User=require('./models/User');
const jwt=require('jsonwebtoken');
const cors=require('cors');
const cookieParser =require('cookie-parser');


 dotenv.config();
// mongoose.connect(process.env.MONGO_URL);
//console.log(process.env.MONGO_URL);
jwtSecret=process.env.JWT_SECRET;

const app=express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    credentials:true,
    origin:'*',
    }));

app.get('/test', (req,res)=>{
    res.json("Test okay");
});


app.get('/profile',(req,res)=>{
    const token =req.cookies?.token;
    if(token){
        jwt.verify(token , jwtSecret , {} , (err,userData)=>{
            if(err) throw err;
            res.json(userData);
        });
    }
    else{
        res.status(401).json('no token');
    }
    


});




app.post('/register', async (req,res)=>{
    const {username, password}=req.body;
    try{
        const createdUser = await User.create({username,password});
        jwt.sign({userId: createdUser._id }, jwtSecret,{},(err,token) =>{
            if(err) throw err;
            res.cookie('token',token).status(201).json({
                id: createdUser._id,
                username,
            });
        });
    }
        catch(err){
            if(err) throw err;
            console.log(err.message);
            res.status(500).json({
                message:err.message
            })
        }
    }
);


connectDB();
app.listen(4040);


