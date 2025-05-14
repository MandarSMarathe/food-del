import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://user1:user%40123@mandar-nodejs.xlqhrn6.mongodb.net/food-del').then(()=>console.log("Database connected..."));
}