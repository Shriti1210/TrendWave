import mongoose from 'mongoose';

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connected")
    }catch(error){
        console.log("error!Database couldn't be connected")
    }
    
}

export default connectDb;
