const express=require('express');
const bodyParser=require('body-parser');
const promoRouter=express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')


.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) =>{
    res.end('Will send all the promotions to you!');

})
.post((req,res,next) =>{
    res.end('Will add the promotion with'+req.body.name+'and with description'+req.body.description);
})
.put((req,res,next) =>{
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
    res.end('Deleting the promotion');
})
promoRouter.route('/:promoId')



.get((req,res,next) =>{
    res.end('Will send all the promotions to you with promotionsId'+req.params.promoId);

})
.post((req,res,next) =>{
    res.statusCode=403;
    res.end('POST operation not supported');
})
.put((req,res,next) =>{
    res.write('Updating the promotion with'+req.params.promoId);
    res.end('Will update the dish with dishId'+req.params.promoId+'with name'+req.body.name+'and with description'+req.body.description);

})
.delete((req,res,next) => {
    res.end('Deleting the dish with ID'+req.params.promoId)
});


module.exports= (promoRouter);
