const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSignUp = async (req, res) => {
    try{
        const {name, email, password} = req.body

        if ([name, email, password].some((field) => field?.trim() === "")) {
            return res.status(400).json({ message : "All fields are required, please fill all fields!" });
        }

        const userExists = await User.findOne({email})

        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Add user 
        const user = await User.create({
            name,
            email,
            password : hashedPassword
        });

        res.status(201).json({ message: "User registered successfully" });

    }catch(error){
        res.status(500).json({message : "Registration failed", error : error.message});
    }
}

const userLogIn = async (req, res) => {
    try{
        const { email, password } = req.body;

        if (!email && !password) {
        return res
            .status(400)
            .json({ message: "password and email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
        return res
            .status(404)
            .json({ message: "User does not exist, Please sign up and try again" });
        }

        // validate the password using bcrypt

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(401).json({ message: "Invalid Password" });
        }

        // Generate access token

        const accessToken = jwt.sign({_id : user._id, name : user.name, email : user.email}, process.env.SECRET_TOKEN_KEY, {expiresIn : '1h'})

        // Exclude sensitive info from user

        const logedInUser = await User.findById(user._id).select("-password -createdAt -updatedAt")

        return res
            .status(200)
            .json({
                message : "User Logedin Successfully!",
                user : logedInUser,
                accessToken
            })    

    }catch(error){
        return res
        .status(500)
        .json({ error: error.message || "Internal server error" });
    }
}

const userDetails = async (req, res) => {
    res.json({message : "Protected route accessible", User : req.user})
}

const allOwners = async (req, res) => {
    try{
        const allUsers = await User.find()
        if(allUsers){
            return res.status(200).json({message : "All Users fetch successfully", allUsers : allUsers})
        }else{
            return res
            .status(404)
            .json({ message: "No user/owner registered with us!" })
        }
    }catch(error){
        return res.status(500).json({error : error.message || "Internal server error"})
    }
}






module.exports = {userSignUp, userLogIn, userDetails, allOwners}