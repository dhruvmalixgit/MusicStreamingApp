const express = require("express");
const passport = require("passport");
const router = express.Router();
const Song = require("../models/Song");
const User = require("../models/User");

//here passport.authenticate is a middleware which is used to populate req.user to user;
router.post("/create",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    
    const{name,thumbnail,track}=req.body;
    if(!name || !thumbnail || !track)
    {
        return res.status(301).json({err:"Insuffiient details to create a song"});
    }
    const artist = req.user._id;
    const songDetails = {name,thumbnail,track,artist};
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
});

// get route too all songs i have published;
router.get("/get/mysongs",passport.authenticate("jwt",{session:false}),async (req,res)=>{
   
    //we need to get all songs where artists id == currentuser._id
    const songs = await Song.find().populate("artist");
    return res.status(200).json({data:songs});
});

// get roue to get all songs any artist has published
// i will send he artist id and i want to see all songs that artist has published;
router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const {artistId}=req.params;
    // we can check if the artist does not exist
    const artist = await User.findOne({_id:artistId});
    if(!artist)
    {
        return res.status(301).json({err:"artist does not exists"});
    }

    const songs = await Song.find({artist:artistId});
    return res.status(200).json({data:songs});
});
// get route to get a single song by name;
router.get("/get/songname/:songName",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const {songName} = req.params;
    const songs = await Song.find({name:songName}).populate("artist");
    return res.status(200).json({data:songs});

})



module.exports=router;