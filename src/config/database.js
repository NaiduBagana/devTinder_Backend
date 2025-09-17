const mongoose = require("mongoose");
// if(process.env.NODE_ENV !== 'production')

const { MONGO_URL } = require("../utils/constants");
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  // console.log('MongoDB connected successfully');
  return;
};

module.exports = { connectDB };
