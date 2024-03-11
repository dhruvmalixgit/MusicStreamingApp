const mongoose = require("mongoose");

//how to create a model
//step 1 require mongoose
// stp2 create a schema (structure of a user)
// step3 create a model -> it helps to store in the database
//

const Song = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    thumbnail:{
        type:String,
        required:false,  
    },
    track:{
        type:String,
        required:true,
    },
    artist:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
});

const SongModel = mongoose.model("Song",Song);
module.exports = SongModel; // if any other file demands this model it can acquire this file as Song.js;