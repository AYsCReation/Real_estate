import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';
export const updateUser = async(req,res,next) =>{
 if(req.user.id !== req.params.id) return next(errorHandler(401 , "You can Update your own account!"));
 try {
    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password , 10);
    }
    const UpdatedUser = await User.findByIdAndUpdate(req.params.id , {
        $set : {
             username : req.body.username,
             email : req.body.email,
             password : req.body.password,
             avatar : req.body.avatar,
        }
    } , {new : true})
    const {password , ...rest} = UpdatedUser._doc;
    res.status(200).json(rest);

 } catch (error) {
    next(error);
 }
}
export const deleteUser = async(req , res , next) =>{
    if(req.user.id !== req.params.id) return next(errorHandler(401 , "You can delete your own account!"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json("User has been deleted successfully!");
    } catch (error) {
        next(error);
    }
}
export const getUserListings = async(req,res,next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401 , "You can see your own Listings only!"));

    try {
        const Listings = await Listing.find({userRef : req.params.id});
        res.status(200).json(Listings);
    } catch (error) {
        next(error);
    }
}

export const getUser = async(req, res , next) =>{
    try {
        
        const user = await User.findById(req.params.id);
        if(!user) return next(errorHandler(404 , "No user Found"));
        const {password: pass , ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}