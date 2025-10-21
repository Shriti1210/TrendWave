import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import {genToken, genToken1} from "../config/token.js"; 
import dotenv from "dotenv";
dotenv.config();

export const registration=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"User already exists!"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Enter a valid Email"})
        }
        if(password.length<8){
            return res.status(400).json({message:"Enter a Strong password"})
        }
        let hashPassword=await bcrypt.hash(password,10);
        const user=await User.create({username,email,password:hashPassword});
        let token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })
        return res.status(201).json(user)
    } catch (error) {
        console.log("registration error")
        return res.status(500).json({message:`Registration Error ${error} `})
    }
}


export const login=async(req,res)=>{
    try {
        let {email,password}=req.body;
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User Not Found"});
        }
        let isMatch=await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:"Password does not match"});
        }
        let token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
             secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })
        return res.status(201).json(user)
    } catch (error) {
        console.log("Login error")
        return res.status(500).json({message:`Login Error ${error} `})
    }
}

export const logout=async(req,res)=>{
   try {
       res.clearCookie("token")
       return res.status(200).json({message:"logOut successful"});
   } catch (error) {
    console.log("Logout error")
    return res.status(500).json({message:`Logout Error ${error} `})
   }
}

export const googleLogin=async(req,res)=>{
    try {
        let{username,email}=req.body;
        let user=await User.findOne({email});
        if(!user){
            user=await User.create({username,email});
        }
        let token= await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
             secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })
        return res.status(200).json(user);

    } catch (error) {
        console.log("googleLogin Error");
        return res.status(500).json({message:`google Login error ${error}`});
    }
}

//microsoft login
export const microsoftLogin=async(req,res)=>{
    try {
        let{username,email}=req.body;
        let user=await User.findOne({email});
        if(!user){
            user=await User.create({username,email});
        }
        let token= await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
             secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })
        return res.status(200).json(user);

    } catch (error) {
        console.log("microsoftLogin Error");
        return res.status(500).json({message:`Microsoft Login error ${error}`});
    }
}

//Admin controller route
export const adminLogin = async (req, res) => {
  try {
    console.log("Admin login");
    console.log("Body:", req.body);
    console.log("Env Email:", process.env.ADMIN_EMAIL);
    console.log("Env Password:", process.env.ADMIN_PASSWORD);

    let { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      let token = await genToken1(email);
      res.cookie("token", token, {
        httpOnly: true,
         secure:true,
         sameSite:"none",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      console.log("✅ Admin logged in successfully");
      return res.status(200).json(token);
    }

    console.log("❌ Invalid credentials");
    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log("Admin Login Error:", error);
    return res.status(500).json({ message: `AdminLogin error ${error}` });
  }
};
