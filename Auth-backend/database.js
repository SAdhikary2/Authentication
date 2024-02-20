const mongoose= require('mongoose');
const colors =require('colors');

const DatabaseConnection=async()=>{
    try{
        const con=await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB Atlas".bgMagenta.white);

    }
    catch{
        console.log(`Error in Database Connection ${error}`);

    }
}

module.exports=DatabaseConnection;