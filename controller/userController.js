const users = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// register
exports.registerController = async(req,res)=>{
    console.log("Inside Register controller");
    console.log(req.body);
    const {username,email,password} = req.body
    try{
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("Already existing user... Please login!!!")
        }
        else{
            const newUser = new users({
                username,email,password:hashedPassword,gender:"",phoneno:"",profilePic:"",role:"user"
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}

// login
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(404).json("Invalid Email / Password!!!" );
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(404).json("Invalid Email / Password!!!");
        }
        const token = jwt.sign({ userId: existingUser._id },process.env.JWTPASSWORD);
        res.status(200).json({
            user: existingUser,
            token
        })
    } 
    catch (err) {
        res.status(500).json(err);
    }
};

// profile updation
exports.editUserController = async(req,res)=>{
    console.log("Inside editUserController");
    const {username,email,password,gender,phoneno,profilePic} = req.body
    const uploadProfilePic = req.file ? req.file.filename : profilePic
    const userId = req.userId    
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,gender,phoneno,profilePic:uploadProfilePic
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// all users
exports.allUserController = async(req,res)=>{
    console.log("Inside allUserController");
    try{
        const allUsers = await users.find()
        res.status(200).json(allUsers)
    }
    catch(err){
        res.status(401).json(err)
    }
}
