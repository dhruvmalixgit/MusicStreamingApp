//npm init : this is a node project
//npm i express se expressjs package download hogya

const express = require("express"); //we are putting all the functionalities of express into this function;
// const { default: mongoose } = require("mongoose");
const app = express(); // al the express functionalities to local variable;

const mongoose = require("mongoose");
require("dotenv").config();
// down 2 lines are for passport jwt
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const User=require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const cors=require("cors");
app.use(express.json());//if anything is in req.body convert it into json;
app.use(cors());
const port=8000;
//connect mogodb to node app
//we use dotenv package to add security as we it is not advisable to add your password directly to the link below ;
// the password is saved in the env file which we will not uploa to the github hence our password will remain safe;
mongoose.connect("mongodb+srv://dhruv1212malik:"+process.env.MONGO_PASSWORD+"@cluster0.bch6wa5.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}) // mongoose.connect takes two arguments : 1- which db to connect to (db url),2- connection options;

// if connected properly the below code will print connected to mongo when we hit enter node index.js on the terminal;
.then((x)=>{
    console.log("connected to mongo");
})
.catch((err)=>{
    console.log("error while connecting to mongo",err);
});


// setup passport jwt///////////////////////////////////////////////
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "asdfghjkl"; 
//-------------------------------------------------------------------------
// passport.use(
//     new JwtStrategy(opts, function (jwt_payload, done) {
//         User.findOne({_id: jwt_payload.identifier}, function (err, user) {
//             // done(error, doesTheUserExist)
//             if (err) {
//                 return done(err, false);
//             }
//             if (user) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//                 // or you could create a new account
//             }
//         });
//     })
// );
//--------------------------------------------------------------------------

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    // // User.findOne({id: jwt_payload.sub}, function(err, user) {  //with this, all songs from all the diff users will be created under single user only (and this is an issue)
    //     User.findOne({_id: jwt_payload.identifier}, function(err, user) {  // this will fix the above issue, each different songs by diff users will be listed under their individual 'mySongs' route only

    //     // in login
    //     // done(error, isUserExists)

    //     if (err) {   // if error found, then 'jwt tocken not matched', try to login again
    //         return done(err, false);
    //     }
    //     if (user) {  // user found, jwt matched, user logged in 
    //         return done(null, user);
    //     } else {
    //         return done(null, false);  // no error, no user, so create new account
    //         // or you could create a new account
    //     }
    // });
    try{
        const user = await User.findOne({_id: jwt_payload.identifier});

        // in login
        // done(error, isUserExists)
        if(user){
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }catch(error){
        return done(error, false);
    }
}));
// we have made a secret key and we havve put that into our env file;
//not mandatory thats why commenting 2 ines below
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';



///////////////////////////////////////////////////////////////////////

// Api : get type : / : return "hello world" 

app.get("/",(req,res)=> {
    //req contains all data for the request;
    //res conntains all data for response;
    res.send("Hello World");
});
app.use("/auth",authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);


// now we want to tell express that we want to run the server on which local host;
app.listen(port,()=>{ //port is defined on line 6;
    console.log("app is running on port"+" "+port);
});