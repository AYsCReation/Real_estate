import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const userRoute = express.Router();

userRoute.post('/update/:id' , verifyToken, updateUser);    
userRoute.delete('/delete/:id' , verifyToken, deleteUser);    

export default userRoute;