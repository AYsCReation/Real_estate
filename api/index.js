import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from "./routes/auth.route.js";

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

app.use("/api/auth", router );

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
