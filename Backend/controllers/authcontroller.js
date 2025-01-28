const userModel=require("../models/user-model");
const bcrypt=require("bcrypt");
const {generateToken}=require("../utils/generateToken");
const productModel=require("../models/product-model");

module.exports.registerUser=async function(req, res){
    try{
        let data=req.body;
       let user=await userModel.findOne({ email: data.email });
         if(user){
             return  res.status(401).send("User already exists , please login");
            
                }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) res.send(err.message);
            bcrypt.hash(data.password, salt, async(err, hash) => {
                if (err) res.send(err.message);
                else {
                    let user=await userModel.create({email:data.email,password:hash,firstname:data.firstname,lastname:data.lastname,phone:data.phone,state:data.state,district:data.district,city:data.city});
                    let token=generateToken(user);
                    res.cookie("token", token);
                    res.send("User created successfully");
                }
            });

        });
       
        }
        catch(err){
            console.log(err.message);
        }
}

module.exports.loginUser=async function(req, res){
    let {email,password}=req.body;
    let user=await userModel.findOne({email});
    if(!user){
        return res.send("User Does Not Exist , Please Register");
    }
    bcrypt.compare(password, user.password,async function(err,result){
        if (err) return res.status(500).send(err.message);
        if(res){
            let token=generateToken(user);
            res.cookie("token", token);
            let products = await productModel.find();
            res.render('shop',{products: products});
        }
        else{
            res.send("Invalid Email or Password");
        }
    });
};

module.exports.logOut= function(req,res){
    res.cookie("token","");
    res.redirect("/")
}
