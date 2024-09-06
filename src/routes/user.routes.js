import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userValidator } from "../middlewares/user.validator.js";

const router = Router();

router.post("/user/register",userValidator,registerUser);
router.post("/user/login",loginUser);
router.post("/user/logout",verifyJWT,logoutUser)

export default router;