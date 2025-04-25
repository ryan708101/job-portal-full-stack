import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log('Database Connected'))
     //console.log(process.env.MONGODB_URI);
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)

}

export default connectDB