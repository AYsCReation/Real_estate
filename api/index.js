import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import userRoute from "./routes/user.route.js";
import listingRoute from './routes/listing.route.js';

dotenv.config();

mongoose.connect("mongodb+srv://ayushm850:ayushmishra@cluster0.qws2kwa.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('connected to mongodb!'); 
  })
  .catch((err) => {
    console.log("not connected", err);
  });
   
const app = express();
app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth", router );
app.use("/api/user", userRoute);
app.use("/api/listing" , listingRoute);

 
app.use((err, req , res , next) => {
  const statusCode  = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message, 
  })
})  
 
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
 