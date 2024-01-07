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
   const formData = req.body;
   if (!formData.email || !formData.password) {
      return next(errorHandler(404 , "Please fill all the details sir!"))
    }
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
export const google = async(req , res , next) =>{
   try {
      const user = await User.findOne({email : req.body.email});
      if(user){
         const token = Jwt.sign({id : user._id} , "mishraayush");
         const { password : pass , ...rest } = user._doc;
         res.cookie('access_token', token , {httpOnly : true}).status(200).json(rest);

      }else{
         const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
         const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
         const newUser = new User({username : req.body.name.split(" ").join("").toLowerCase() +  Math.random().toString(36).slice(-4) , email : req.body.email , password : hashedPassword , avatar : req.body.photo});
          await newUser.save();
          const token = Jwt.sign({id : newUser._id} , "mishraayush");
         const { password : pass , ...rest } = newUser._doc;
         res.cookie('access_token', token , {httpOnly : true}).status(200).json(rest);

      }
   } catch (error) {
      next(error);
   }
}

export const signout = (req, res , next) =>{
try {
   res.clearCookie('access_token');
   res.status(200).json('User has been logged out!');
} catch (error) {
   next(error);
}
}