let jwt=require("jsonwebtoken");
const userModel=require("../models/user-model");

module.exports=async function(req, res, next){

    if(!req.cookies.token){
        req.flash("error", "Please login to access this page");
        return res.redirect("/");
    }
    try{
        let decoded=jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        let user=await userModel.findONE({email:decoded.email}).select("-password");
        if(!user){
            req.flash("error", "User not found");
            return res.redirect("/");
        }
        req.user=user;
        next();
    }
    catch(err){
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
}