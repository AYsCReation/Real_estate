import express from "express";
import { deleteUser, updateUser , getUserListings , getUser} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const userRoute = express.Router();

userRoute.post('/update/:id' , verifyToken, updateUser);    
userRoute.delete('/delete/:id' , verifyToken, deleteUser);    
userRoute.get('/listings/:id' , verifyToken, getUserListings);    
userRoute.get('/:id' , verifyToken, getUser);    

export default userRoute;