const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

 url=process.env.MONGO_URL;


const connectDB =()=>{
    console.log("Database Connected");
    return mongoose.connect(url,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
};

module.exports=connectDB;


// YashAPI
// mernchatyash
// r9VrvPQGxDw1gtFy