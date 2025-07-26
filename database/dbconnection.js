import mongoose from "mongoose";

export default async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("ERROR CONNECTING TO DATABASE --------------------")
        console.error(err);
        process.exit(1);
    }
}