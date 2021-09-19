const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(20);
        this.password = await bcrypt.hash(this.password,salt);
    }else{
        res.send({success:false,message:"password modified before saving into database"})
    }
})
UserSchema.methods.matchpassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.getSignedToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE})
}

const User = mongoose.model("User",UserSchema);

module.exports = User;