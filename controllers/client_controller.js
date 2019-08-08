const multer = require('multer');
const path = require('path');
const webshot = require('webshot');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const Client = require('../models/client');


module.exports.client  = function(req,res){

    var detail = new Client({
        name : req.query.name,
        address : req.query.address,
        recAmount : req.query.recieved,
        recpNo : req.query.receipt
    });

   
    detail.save(function(err){
        if(err){
            console.log('Error in creating receipt', err);
            return;
        }

        return res.redirect('back');
    });
    // webshot(html, 'hello_world.png', {siteType:'html'}, function(err) {
    //     // screenshot now saved to hello_world.png
    // });

}

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({
    storage : storage,
    
}).single('file');






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

