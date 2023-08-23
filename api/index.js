const express = require("express");
const bodyParser = require("body-parser");
const Router =  require("./routes/routes.js");
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const ErrorHandling = require('./middleware/ErrHandling.js')
const port =+process.env.PORT || 5000
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

//static
app.use(express.static('./static'))
// Middleware - APplication level
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
  });
  app.use(
    express.static('./static'),
    express.urlencoded({
        extended: false
    }),
    cookieParser(),
    cors(),
    Router
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Router.get('^/$|/challenger',(req, res)=>{
    res.sendFile(path.resolve(__dirname,
        "./static/html/index.html"))
})
// use router
app.use(Router);

// app.listen(5000, () => console.log('Server running at http://localhost:5000'));
//Handling all errors using middleware
app.use(ErrorHandling)
app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`);
})