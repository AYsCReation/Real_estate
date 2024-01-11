import express from "express";
import { createListing , deleteListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const listingRoute = express.Router();

listingRoute.post('/create' , verifyToken, createListing);
listingRoute.delete('/delete/:id' , verifyToken, deleteListing);
export default listingRoute;