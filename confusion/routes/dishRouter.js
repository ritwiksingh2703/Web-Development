const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Dishes=require('../models/dishes');
const dishRouter=express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')

.get((req,res,next) =>{
    Dishes.find({})
    .then((dish) => {
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(dish);

    },(err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) =>{
    Dishes.create(req.body)
    .then((dish) =>{
        console.log("dish is created");
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(dish);

    },(err) => next(err))
    .catch( (err) => next(err));
})
.put((req,res,next) =>{
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
   Dishes.remove({})
   .then((resp) => {
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    res.json(resp);
   },(err) => next(err))
   .catch( (err) => next(err));

});

dishRouter.route('/:dishesId')


.get((req,res,next) =>{
    Dishes.findById(req.params.dishesId)
    .then((dish) => {
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(dish);

    },(err) => next(err))
    .catch((err) => next(err));

})

.post((req,res,next) =>{
    res.statusCode=403;
    res.end('POST operation not supported');
})

.put((req,res,next) =>{
    Dishes.findByIdAndUpdate(req.params.dishesId, { $set: req.body}, {new :true})
    .then((dish) => {
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(dish);

    },(err) => next(err))
    .catch((err) => next(err));




})

.delete((req,res,next) => {
   Dishes.findByIdAndRemove(req.params.dishesId)
   .then((resp) => {
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    res.json(resp);
   },(err) => next(err))
   .catch( (err) => next(err));

});


module.exports= (dishRouter);