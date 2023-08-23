const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Router =  require("./routes/routes.js");

// import express
//import express from "express";
// import cors
//import cors from "cors";

//import bodyParser from "body-parser";

// import routes
//import Router from "./routes/routes.js";
// init express
const app = express();

// use express json
app.use(express.json());

// use cors
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.get('^/$|/challenger',(req, res)=>{
    res.sendFile(path.resolve(__dirname,
        "./views/html/index.html"))
})
  
// use router
app.use(Router);

app.listen(5000, () => console.log('Server running at http://localhost:5000'));