const mongoose = require("mongoose");

//how to create a model
//step 1 require mongoose
// stp2 create a schema (structure of a user)
// step3 create a model -> it helps to store in the database

const Playlist = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    thumbnail:{
        type:String,
        required:false,  
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
    //1 playlist main songs konse hain ?
    songs:[
        {
        type:mongoose.Types.ObjectId,
        ref:"Song",
        },
    ],
    collaborators:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User",
        }
    ]
});

const PlaylistModel = mongoose.model("Playlist",Playlist);
module.exports = PlaylistModel; // if any other file demands this model it can acquire this file as Playlist.js;