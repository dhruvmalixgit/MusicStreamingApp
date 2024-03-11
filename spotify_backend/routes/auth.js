const express=require("express");
const router=express.Router();
const User = require("../models/User");
const bcrypt=require("bcryptjs");
const {getToken} = require("../utils/helpers");
// we did not only called express because we do not need all the functionalities but we only need functionalities realted to routing;

//this post route will heelp to create a user;
router.post("/register",async (req,res)=>{
    //this code is run when /register api is called as post request;
    // my req.body will be of the format (emal,password,firstName,latname,username)
    //we have to take req.body to json by telling express to do it, we have inclluded a line in index.js to do this on line 16;
    const {email,password,firstName,lastName,username} = req.body;

    //step 2 does the user with this email already exists? if yes we throw an error
    const user = await User.findOne({email:email}); // this function is used to find a userwho has email same as the usrs email;
    if(user){
        //we could have also used res.json({}) but this sends the message with satatus code 200 but in this case error is of authentication type and all authentication related errors are generally sent with status code in the range of 400's;
        return res.status(403).json({error:"A user with this email already exists"});
    }
    //else this is a valid request

    // step3 : create a new user in the db 
    //step 3.1 we do not save passwords in plain text;
    // we connvert the plain text password into a hash;
    // hash of xyz depends on 2 parammeters
    // if i keep those 2 para same, xyz always gives the same hash;
    //bcrypt does this automatically;
    const hashedPass = await bcrypt.hash(password,10);
    const newUserData = {email,password:hashedPass,firstName,lastName,username};
    const newUser = await User.create(newUserData);

    //step 4: we want to create the token to return to the user;
    const token = await getToken(email,newUser); // get token fuction is present in the utils/helpers to help with code reusability;

    //step 5 return the result to the user;
    // convert newUser to json and sendd it as token;
    const userToReturn = {...newUser.toJSON(),token};
    delete userToReturn.password; // to ensure password is not saved with us to ensure privacy;
    return res.status(200).json(userToReturn);
});

// for login
router.post("/login",async (req,res)=>{
    //step 1 get email and password sent by user from req.body;
    const {email,password} = req.body;
    // step 2 check withh a given user email exists,if not the credentials are invalid;
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(403).json({err:"invalid credentials"});
    }
    //step3 if the user exists check if the password is correct if not te  credentials are invalid
    // icannot do (password=user.password) because we have converted pass into hashed pass
    //bcrypt.compare enabled us to compare password in plain text
    const isPassValid = await bcrypt.compare(password,user.password);
    //this will return true or false;
    if(!isPassValid)
    {
        return res.status(403).json({err:"invalid credentials"});
    }
    //step4 if the credentials are correct send the tokento the user;
    const token = await getToken(user.email,user);
    const userToReturn = {...user.toJSON(),token};
    delete userToReturn.password; // to ensure password is not saved with us to ensure privacy;
    return res.status(200).json(userToReturn);

});
module.exports=router;
