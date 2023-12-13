import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect("mongodb+srv://ayushm850:ayushmishra@cluster0.qws2kwa.mongodb.net/?retryWrites=true&w=majority")
.then(() =>{
    console.log('connected to mongodb!');
})
.catch((err) =>{
    console.log("not connected" , err);
})
const app = express();

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})
 