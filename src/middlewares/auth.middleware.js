import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if(!token){
            return res.status(401).send("Unauthorized access");
            // throw new ApiError(401, "Unauthorized access")
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECERET);
    
        const user = await User.findById(decodedToken?._id)
        .select("-password");
    
        if(!user){
            // throw new ApiError(401, "Invalid Access Token")
            return res.status(401).send("Invalid Access Token");
        }
    
        req.user = user;
        next();
    } catch (error) {
        // throw new ApiError(401, error?.message || "Invalid Access Token")
        res.status(401).send(error?.message || "Invalid Access Token")
    }
}