const express=require('express');
const bodyParser=require('body-parser');
const cors=require('./cors');
const uploadRouter=express.Router();
const authenticate=require('../authentication');
const multer=require('multer');

const storage=multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'public/images');
    },

    filename: (req,file,cb) => {
        cb(null,file.originalname);
    }
});

const imageFileFilter= (req,file,cb) => {
    if(!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)){
        return cb(new Error('You can only upload image files'),false);
    }
    else{
         cb(null,true);
    }
};

const upload=multer({storage:storage,fileFilter:imageFileFilter})


uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.options(cors.corswithOptions,(req,res) => {
    res.sendStatus(200);
})

.get(cors.cors,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode=403;
    res.end('GET operation not supported');
})
.post(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyAdmin,upload.single('imageFile'),(req,res) => {
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    res.json(req.file);
})
.put(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.delete(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode=403;
    res.end('DELETE operation not supported');
})
    

module.exports=uploadRouter;