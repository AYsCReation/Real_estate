import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const userRoute = express.Router();

userRoute.post('/update/:id' , verifyToken, updateUser);

export default userRoute;