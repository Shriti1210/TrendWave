import express from 'express'
import  { registration,login,logout, googleLogin, microsoftLogin, adminLogin } from "../controller/authController.js";

const authRoutes=express.Router();

authRoutes.post("/registration",registration)
authRoutes.post("/login",login)
authRoutes.get("/logout",logout)
authRoutes.post("/googlelogin",googleLogin);
authRoutes.post("/microsoftlogin",microsoftLogin);
authRoutes.post("/adminlogin",adminLogin);


export default authRoutes;