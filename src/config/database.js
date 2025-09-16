const mongoose = require("mongoose");
if(process.env.NODE_ENV !== 'production')
require("dotenv").config();

const connectDB = async () => {
  await mongoose.connect(
    process.env.MONGO_URL,
    
  );
  // console.log('MongoDB connected successfully');
  return;
};

module.exports = { connectDB };
