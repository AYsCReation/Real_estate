import { errorHandler } from "./error.js";
import  Jwt  from "jsonwebtoken";
export const verifyToken = (req, res , next) =>{
    const token = req.cookies.access_token;
    if(!token){
        next(errorHandler(401 , "No User Signed in"));
    }
    try {
        Jwt.verify(token, "mishraayush" , (err , user) => {
            if(err) return next(errorHandler(403 , 'Forbidden'));
            req.user = user;
            next();
        })
    } catch (error) {
        next(error);
    }
}