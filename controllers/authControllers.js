const userModel = require("../models/userModel");
const bcrypt = require ("bcryptjs")
const JWT = require("jsonwebtoken")
//reg
const registerController = async(req,res) => {
    try {
        const {userName,email,password,phone,address,answer}=req.body
        //validate
        if(!userName || !email || !password || !address ||!phone || !answer){
            return res.status(500).send({
                success:false,
                message:"Please provide all fields"
            })
        }
        //user check
        const existing= await userModel.findOne({email})
        if(existing){
            return res.status(500).send({
                success:false,
                message:'Email already registered Please Login'
            })
        }
        //hash pass
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        //new user
        const user = await userModel.create({userName,email,password:hashedPassword,address,phone,answer})
        res.status(201).send({
            success:true,
            message:'Successfully rgistered',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500),send({
            success:false,
            message:'Error in register api',
            error
        })
    }

};

//login
const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        //valid
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"Please provide email or password"
            })
        }
        //user availabalility
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"

            })
        }
        //check user password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'Invalid credentials'
            })
        }
        //jwt
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })
        user.password=undefined;
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            token,
            user,
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in logi api",
            error
        })
    }

}
module.exports = {registerController,loginController}