import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import  Jwt  from "jsonwebtoken";

export const signup = async (req,res , next) =>{
   const formData = req.body;
   if (!formData.username || !formData.email || !formData.password) {
      return next(errorHandler(404 , "Please fill all the details sir!"))
    }
   const {username , email , password} = req.body;
   const hashedPassword = bcryptjs.hashSync(password, 10);
   const user = new User({username , email , password : hashedPassword});
   try {
      await user.save();
      res.status(201).json('User created successfully!');
   } catch(error){
      next(error);
   }
  
}

export const signin = async(req , res , next) =>{
   const {email , password} = req.body;
   try{
      const validUser = await User.findOne({email});
   if(!validUser){
      return next(errorHandler(404 , "User Not Found!"));
   }
   const validPassword = bcryptjs.compareSync(password , validUser.password);
   if(!validPassword) return next(errorHandler(401, "Wrong Credentials!"));
   const { password : pass , ...rest } = validUser._doc;
   const token = Jwt.sign({id : validUser._id}, "mishraayush");
   res.cookie('access_token', token , {httpOnly : true}).status(200).json(rest);
   } catch(error){
      next(error);
   }
   

}