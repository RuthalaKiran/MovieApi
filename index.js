const express = require("express");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

require('dotenv').config();
let db;
const dbname = "movieproject";
const app = express();
const PORT = 8000;
const mongourl =  process.env.Mongourl;
//"mongodb://127.0.0.1:27017"
app.get("/",(req,res)=>{
    res.send("hello world");
})

//shows end point
app.get("/shows",(req,res)=>{
    db.collection("movielist")
    .find()
    .toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//movie end point
app.get("/shows/:movieid",(req,res)=>{
    let query = {}
    let movieid = Number(req.params.movieid);
    if(movieid){
        query={movie_id: movieid}
    }
    db.collection("movielist")
    .find(query)
    .toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//mongoconnection
MongoClient.connect(mongourl,(err,connectedclient)=>{
    console.log("mongodb is connected")
    if(err) console.log("error while connecting to database");
    db = connectedclient.db(dbname);
    app.listen(PORT,()=>{
        console.log("server started at port :",PORT)
    })
})

