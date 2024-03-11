const mongoose = require("mongoose");

//how to create a model
//step 1 require mongoose
// stp2 create a schema (structure of a user)
// step3 create a model -> it helps to store in the database

const User = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
        private:true,
    },
    lastName:{
        type:String,
        required:false,  
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    
    likedsongs:{
        //we will change this to array later
        type:String,
        default:"",
    },
    likedplaylist:{
        // we will change this to array later
        type:String,
        default:"",
    },
    subscribedartist:{
        type:String,
        default:"",
    },
});

const UserModel = mongoose.model("User",User);
module.exports = UserModel; // if any other file demands this model it can acquire this file as User.js;