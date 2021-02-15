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
})

dishRouter.route('/:dishesId')


.get((req,res,next) =>{
    res.end('Will send all the dishes to you with dishId'+req.params.dishesId);

})

.post((req,res,next) =>{
    res.statusCode=403;
    res.end('POST operation not supported');
})

.put((req,res,next) =>{
    res.write('Updating the dish with'+req.params.dishesId);
    res.end('Will update the dish with dishId'+req.params.dishesId+'with name'+req.body.name+'and with description'+req.body.description);

})

.delete((req,res,next) => {
    res.end('Deleting the dish with ID'+req.params.dishesId)
});


module.exports= (dishRouter);