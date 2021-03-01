const express=require('express');
const bodyParser=require('body-parser');

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

.get(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode=403;
    res.end('GET operation not supported');
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,upload.single('imageFile'),(req,res) => {
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    res.json(req.file);
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode=403;
    res.end('DELETE operation not supported');
})
    

module.exports=uploadRouter;