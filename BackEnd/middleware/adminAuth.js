import jwt from 'jsonwebtoken'

const adminAuth=async(req,res,next)=>{
    try {
        let {token}=req.cookies;

        if(!token){
            return res.status(400).json({message:"Not authorized,try again later"});
        }

        let verifyToken=jwt.verify(token, process.env.JWT_SECRET)

        if(!verifyToken){
            return res.status(400).json({message:"Invalid Token, login again"})
        }
        req.admin = {
              email: process.env.ADMIN_EMAIL
        };
        next();

    } catch (error) {
        console.log("AdminAuth error");
        return res.status(500).json({message:`AdminAuth Error ${error}`})
    }
}

export default adminAuth;