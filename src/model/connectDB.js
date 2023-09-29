import mongoose from "mongoose";
import 'dotenv/config'


const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_DB
        )
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export default connectDB;