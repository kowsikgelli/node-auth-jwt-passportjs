const passport = require('passport');
const User = require('../models/userModel')
exports.register = async (req,res,next)=>{
    const {username,email,password} = req.body;
    try{
        const user = await User.create({
            username,
            email,
            password
        })
        res.send({success:true,message:"Registration Succesful"})
    }catch(err){
        res.send({success:false,message:"user registraion failed",err:err.message})
    }
}

exports.authenticate = async (req,res,next)=>{
    const {email , password} = req.body;
    console.log(password);
    try{
        const user = await User.findOne({email:email});
        if(!user){
            res.send({success:false,message:`${email} is not registered`})
        }
        const isMatch = await user.matchpassword(password);
        if(isMatch){
            const token = user.getSignedToken();
            res.send({
                success:true,
                message:'JWT '+token,
                user:{
                    id:user._id,
                    username:user.username,
                    email:user.email,
                    password:user.password
                }
            })
        }else{
            res.send({success:false,message:"Invalid Password"})
        }
    }catch(err){
        res.send({success:false,message:"error finding user",err:err.message})
    }
}

exports.profile = async (req,res)=>{
    res.send({success:true,user:req.user})
}