const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Promotions=require('../models/promotions');
const authenticate=require('../authentication');
const promoRouter=express.Router();
promoRouter.use(bodyParser.json());
const cors=require('./cors')

promoRouter.route('/')
.options(cors.corswithOptions,(req,res) => {
    res.sendStatus(200);
})

.get(cors.cors,(req,res,next) =>{
   Promotions.find({})
   .then((promotion) => {
       res.statusCode=200;
       res.setHeader('Content-type','application/json');
       res.json(promotion);
   },(err) => next(err))
   .catch((err) => next(err))


})
.post(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
   Promotions.create(req.body)
   .then((promotion) =>{
       console.log("Promotion is created");
       res.statusCode=200;
       res.setHeader('Content-type','application/json');
       res.json(promotion);
   },(err) => next(err))
   .catch((err) => next(err));
})
.put(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.delete(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
   Promotions.remove({})
   .then((resp) => {
       res.statusCode=200;
       res.setHeader('Content-type','application/json');
       res.json(resp);
   },(err) => next(err))
   .catch((err) => next(err))
});

promoRouter.route('/:promoId')
.options(cors.corswithOptions,(req,res) => {
    res.sendStatus(200);
})

.get(cors.cors,(req,res,next) =>{
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(promotion);

    },(err) => next(err))
    .catch((err) => next(err));

})

.post(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode=403;
    res.end('POST operation not supported ');
})
.put(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    Promotions.findByIdAndUpdate(req.params.promoId,{ $set: req.body},{new:true})
    .then((promotion) => {
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(promotion);

    },(err) => next(err))
    .catch((err) => next(err));


})
.delete(cors.corswithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) =>{
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
       },(err) => next(err))
       .catch( (err) => next(err));
    
    
});


module.exports= (promoRouter);
