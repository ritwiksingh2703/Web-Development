const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Dishes=require('../models/dishes');
const dishRouter=express.Router();
const authenticate=require('../authentication')
dishRouter.use(bodyParser.json());

dishRouter.route('/')

.get((req,res,next) =>{
    Dishes.find({})
    .populate('comments.author')
    .then((dish) => {
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(dish);

    },(err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    Dishes.create(req.body)
    .then((dish) =>{
        console.log("dish is created");
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(dish);

    },(err) => next(err))
    .catch( (err) => next(err));
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
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
    .populate('comments.author')
    .then((dish) => {
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(dish);

    },(err) => next(err))
    .catch((err) => next(err));

})

.post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode=403;
    res.end('POST operation not supported');
})

.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    Dishes.findByIdAndUpdate(req.params.dishesId, { $set: req.body}, {new :true})
    .then((dish) => {
        res.statusCode=200;
        res.setHeader('Content-type','application/json');
        res.json(dish);

    },(err) => next(err))
    .catch((err) => next(err));




})

.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
   Dishes.findByIdAndRemove(req.params.dishesId)
   .then((resp) => {
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    res.json(resp);
   },(err) => next(err))
   .catch( (err) => next(err));

});

dishRouter.route('/:dishesId/comments')

.get((req,res,next) =>{
    Dishes.findById(req.params.dishesId)
    .populate('comments.author')
    .then((dish) => {
        if(dish!=null) {
            res.statusCode=200;
            res.setHeader('Content-type','application/json');
            res.json(dish.comments);

        }
        else{
            err=new Error('Dishes with'+ req.params.dishesId +'not found' );
            err.status=404;
            return next(err);
        }
        
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req,res,next) =>{
    Dishes.findById(req.params.dishesId)
    .then((dish) =>{
        if(dish!=null){
           req.body.author=req.user._id;
           dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                Dishes.findById(req.params.dishesId)
                .populate('comments.author')
                .then((dish) => {
                    res.statusCode=200;
                res.setHeader('Content-type','application/json');
                res.json(dish);
            },(err) => next(err))
             
              
            
        })}
        else{
            err=new Error('Dishes with'+ req.params.dishesId +'not found' );
            err.status=404;
            return next(err);
        }
    },(err) => next(err))
    .catch( (err) => next(err));
})
.put(authenticate.verifyUser,(req,res,next) =>{
    res.statusCode=403;
    res.end('PUT operation not supported on'+ req.params.dishesId);
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Dishes.findById(req.params.dishesId)
   .then((dish) => {
       if(dish!=null)
        {
           for(var i=(dish.comments.length-1);i>=0;i--)
           {
             
            dish.comments.id(dish.comments[i]._id).remove(); }

          
                dish.save()
                .then((dish) => {
                
                res.statusCode=200;
                res.setHeader('Content-type','application/json');
                res.json(dish);

       },(err) => next(err))
       }
       
       
       else {
        err=new Error('Dishes with'+ req.params.dishesId +'not found' );
        err.status=404;
        return next(err);
       }
    },(err) => next(err))
   .catch((err) => next(err));
});

dishRouter.route('/:dishesId/comments/:commentId')


.get((req,res,next) =>{
    Dishes.findById(req.params.dishesId)
    .populate('comments.author')
    .then((dish) => {
        if(dish!=null && dish.comments.id(req.params.commentId)!=null){
            res.statusCode=200;
            res.setHeader('Content-type','application/json');
            res.json(dish.comments.id(req.params.commentId));
 
        }
        else {
            err=new Error('Dishes with comments ID'+ req.params.commentId +'not found' );
            err.status=404;
            return next(err); 
        }
    },(err) => next(err))
    .catch((err) => next(err));

})

.post(authenticate.verifyUser,(req,res,next) =>{
    res.statusCode=403;
    res.end('POST operation not supported on '+req.params.commentId);
})

.put(authenticate.verifyUser,(req, res, next) => {
    Dishes.findById(req.params.dishesId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if(dish.comments.id(req.params.commentId).author._id.toString()!=req.user._id.toString() || req.user.admin===true){
                err=new Error('You are not authorized to edit this comment');
                err.status=403;
                return next(err);
            }
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            dish.save()
            .then((dish) => {
                Dishes.findById(req.params.dishesId)
                .populate('comments.author')
                .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);                
                }, (err) => next(err));  
               
        })}
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishesId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Dishes.findById(req.params.dishesId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if(dish.comments.id(req.params.commentId).author._id.toString()!=req.user._id.toString() || req.user.admin===true){
                err=new Error('You are not authorized to edit this comment');
                err.status=403;
                return next(err);
            }
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish) => {
                Dishes.findById(req.params.dishesId)
                .populate('comments.author')
                .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);                
                }, (err) => next(err));
                })
               
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishesId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports= dishRouter;