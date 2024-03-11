const express = require("express");
const passport = require("passport");
const router = express.Router();
const Playlist= require("../models/Playlist");
const User =require("../models/User");
const Song = require("../models/Song");

// create a playlist
router.post("/create",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const currentUser = req.user;
    const{name,thumbnail,songs}=req.body;
    if(!name||!thumbnail||!songs)
    {
        return res.status(301).json({err:"insufficient data"});
    }
    const playlistData = {name,thumbnail,songs,owner:currentUser._id,collaborators:[],};
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
})

// get playlist by id
// we will get playlist id as route parameter and we will return the playlist having that id
//we used colon  here before the playlist id because here plau=ylist id is a variable and it can have any value assigned to id ;
router.get("/get/playlist/:playlistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    //this concept is calle req.params;
    const playlistId = req.params.playlistId;
    //i need to find a playlist wiith the -id=playlistId;
    const playlist = await Playlist.findOne({_id:playlistId});
    if(!playlist)
    {
        return res.status(301).json({err:"Invalid Id"});
    }
    return res.status(200).json(playlist);
});

//get all playlist by an artist;

router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async (req,res)=>{
    const artistId = req.params.artistId;
    const artist = await User.findOne({_id:artistId});
    if(!artist)
    {
        return res.status(304).json({err:"Invalid Artist Id"});
    }
    const playlist = await Playlist.find({owner:artistId});
    return res.status(200).json({data:playlist});
});
//add a song to a playlist;
router.post("/add/song",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const currentUser = req.user;
    //step 1 check if current user owns the playlist or if he is aa collaborator;
    const {playlistId,songId}=req.body;
    const playlist = await Playlist.findOne({_id:playlistId});
    if(!playlist){
        return res.status(304).json({err:"Playlist does not exists"});
    }
    if(!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id))
    {
        return res.status(400).json({err:"Not Allowed"});
    }
    // steep2 check the song is a valid song
    const song = await Song.findOne({_id:songId});
    if(!song)
    {
        return res.status(304).json({err:"Song does not exists"});
    }
    //we can now simply add the song to the playlist 
    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json(playlist);
});
module.exports=router;