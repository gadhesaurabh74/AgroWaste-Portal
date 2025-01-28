const jwt=require("jsonwebtoken");
require('dotenv').config();
const generateToken=(user)=> {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY);
  }


module.exports.generateToken=generateToken;