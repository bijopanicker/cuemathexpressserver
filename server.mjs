import express from 'express'
import path from 'path'
// import cors from 'cors'

import mongoose from 'mongoose';

// const cors = require("cors");

import cors from 'cors'

const app = express();
app.use(express.json());

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) 

// const port = process.env.PORT || 3000 ;

const port = 3000 ;




const mongodbUri = 'mongodb+srv://bijo:TfE68elk91rxn7zV@cluster0.gbjr68m.mongodb.net/gamedata';

mongoose.connect(mongodbUri);

const sch = {
    RandomNumber:Number,
    wrongAttemptCountArray:Array,
    }
const monmodel = mongoose.model("cardgamedata",sch);

const sch1 = {
    totalTime:Number,
    unixTime:Number,
    }
const monmodel1 = mongoose.model("timedata",sch1);

const sch2 = {
    pinCode:Number,
    distance:Number,
    }
const monmodel2 = mongoose.model("liftdata",sch2);


app.post("/postcardgamedata",async(req,res)=>{
    // console.log("inside post function");
    const data = new monmodel({
        RandomNumber:req.body.RandomNumber,
        wrongAttemptCountArray:req.body.wrongAttemptCountArray,
    })
    const val = await data.save();
    res.json(val);
})

app.post("/postsomeotherdata",async(req,res)=>{
    // console.log("inside post function");
    const data = new monmodel1({
        totalTime:req.body.totalTime,
        unixTime:req.body.unixTime,
    })
    const val = await data.save();
    res.json(val);
})


app.post("/postliftdata",async(req,res)=>{
    // console.log("inside post function");
    const data = new monmodel2({
        pinCode:req.body.pinCode,
        distance:req.body.distance,
    })
    const val = await data.save();
    res.json(val);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

// 10.187.27.14

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
