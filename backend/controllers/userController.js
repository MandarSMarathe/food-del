import userModel from './../models/userModel.js';
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcrypt'


//login user
const loginUser= async(req,res) =>{
    const {email,password}= req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            res.json({success:false, message:"User doesn't exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.json({success:false,message:"Invalid Credentials"});
        }
        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

const createToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

//register user
const registerUser = async(req,res) =>{
    const {name,email,password}= req.body;
    try {
        //checks for existing user
        const exists= await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"});
        }
        //validate email pass
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid email address"});
        }
        if(password.length<8){
            return res.json({success:false,message:'Please enter a strong password'});
        }
        const salt= await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(password,salt);

        const newUser= new userModel({
            name:name,
            email:email,
            password:hashedPass
        })

        const user= await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:'Error'})
    }
}

export {loginUser,registerUser}