const express = require('express');   // including express js 
const path = require('path');   //accessing path module
const port = process.env.PORT || 8000; // defining port 
const db= require('./config/mongoose'); // accessing datebase
const client = require('./models/client');  //including database schema
var bodyParser = require('body-parser'); // adding body parser to project

const app = express(); // object of express module
app.use(bodyParser.urlencoded({extended: true})); //object using body parser

app.set('view engine','ejs');  //  setting up ejs as a view engine
app.set('views',path.join(__dirname,'views'));  // setting up default view path


app.use(express.urlencoded()); // object using url encoder
app.use(express.static('assets')); // accessing static files

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/', require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log("Error in server in port :",port);

    }

    console.log("server is running on port: ",port);
});