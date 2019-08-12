const multer = require('multer');
const path = require('path');
const webshot = require('webshot');
const fs = require('fs');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const Client = require('../models/client');

// date in receipt image
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var today = new Date();
var date = today.getDate()+' '+monthNames[today.getMonth()]+' ,'+today.getFullYear();


module.exports.client  = function(req,res){

    var detail = new Client({
        name : req.query.name,
        address : req.query.address,
        recAmount : req.query.recieved,
        recpNo : req.query.receipt
    });

    const path1 =  __dirname.split('\\');
    path1.pop();
    const logo = "http://localhost:8000/images/sugandh.png";
    const image = "http://localhost:8000/uploads/users/avatars/file.jpg";
    
    // making receipt image
    const HTML = `
        <html>
        <head>
            <title></title>
        </head>
        <body style="font-family: 'Slabo 27px', serif;font-family: 'Roboto Slab', serif;background-color: white">
            <div style="height: 550px;text-align: center; padding: 10px;border : 1px solid; " id="recp">
                <img src="${logo}" id="logo" style="">
                <br>
                <br>
        
                <div style="text-align: left;">
                    <span style="font-weight: bold;">Receipt No.: ${req.query.receipt}</span><br>
        
                    <p>We have received an amount of Rs.${req.query.recieved} from ${req.query.name}, ${req.query.address}  on ${date}.</p>
                    <br>
                    <br>
                    <br>
                    <span>Thank You.</span>
        
                </div>
                <img src="${image}" style="width: 200px;position: relative;bottom: -118px;height: 100px;">
            </div>
        </body>
        </html>`


        var options = {
            siteType: 'html',
            screenSize: {
              width: 320
            , height: 480
            }
          , shotSize: {
              width: 320
            , height: 'all'
            }
          , userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
              + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
        };
        

     // saving data in database
     webshot(HTML, 'image.png', options, function(err) {
        if (err !== null) {
            console.log('Error occured', err);
            
        }
        
        res.download('image.png');
    });
}

// alloting storage for uploaded photo
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname +".jpg");
    }
});

const upload = multer({
    storage : storage,
    
}).single('file');



// controller for uploading function
module.exports.upload = function(req,res){
    upload(req,res,(err) =>{
        if(err){
            console.log("error in uploading image",err);
            return;
        }
        else{
            
            res.redirect('back');
        }
    }) 
}

