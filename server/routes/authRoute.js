import { Router } from "express";
import { loginSchema, registerSchema, validate } from "../utils/validator.js";
import { loginUser, registerUser } from "../controllers/authControllers.js";
const router = Router();



router.post('/login',validate(loginSchema),loginUser);
router.post('/register',validate(registerSchema),registerUser);



export default router;