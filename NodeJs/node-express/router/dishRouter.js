const express=require('express');
const bodyParser=require('body-parser');
const dishRouter=express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')

.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) =>{
    res.end('Will send all the dishes to you!');

})
.post((req,res,next) =>{
    res.end('Will add the dish with'+req.body.name+'and with description'+req.body.description);
})
.put((req,res,next) =>{
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
    res.end('Deleting the dish');
});

module.exports= (dishRouter);