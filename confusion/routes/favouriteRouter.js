const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Favourites=require('../models/favourite');


const favouriteRouter=express.Router();
const authenticate=require('../authentication')
favouriteRouter.use(bodyParser.json());
const cors=require('./cors');

const Dishes=require('../models/dishes');


favouriteRouter.route('/')
.options((req,res) => {
    res.sendStatus(200);
})
.get(authenticate.verifyUser, (req,res) => {
    Favourites.findOne({user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( authenticate.verifyUser,(req,res,next) => {
    Favourites.findOne({user: req.user._id})
    .then((favorites) => {
        if (favorites) {
            for (var i=0; i<req.body.length; i++) {
                if (favorites.dishes.indexOf(req.body[i]._id) === -1) {
                    favorites.dishes.push(req.body[i]._id);
                }
            }
            favorites.save()
            .then((favorites) => {
                console.log('Favorite Created ', favorites);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err)); 
            
        }
        else {
            Favourites.create({"user": req.user._id, "dishes": req.body})
            .then((favorites) => {
                console.log('Favorite Created ', favorites);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, (err) => next(err));
        }
    }, (err) => next(err))
    .catch((err) => next(err));  
})
.put( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete( authenticate.verifyUser, (req, res, next) => {
    Favourites.findOneAndRemove({"user": req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));   
});

favouriteRouter.route('/:dishesId')
.options( (req, res,next) => { res.sendStatus(200); })
.get(authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites/'+ req.params.dishesId);
})
.post(authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .then((favorites) => {
        if (favorites) {            
            if (favorites.dishes.indexOf(req.params.dishesId) === -1) {
                favorites.dishes.push(req.params.dishesId)
                favorites.save()
                .then((favorites) => {
                    console.log('Favorite Created ', favorites);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorites);
                }, (err) => next(err))
            }
        }
        else {
            Favourites.create({"user": req.user._id, "dishes": [req.params.dishesId]})
            .then((favorites) => {
                console.log('Favorite Created ', favorites);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorites);
            }, (err) => next(err))
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/'+ req.params.dishesId);
})
.delete( authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .then((favorites) => {
        if (favorites) {            
            index = favorites.dishes.indexOf(req.params.dishesId);
            if (index >= 0) {
                favorites.dishes.splice(index, 1);
                favorites.save()
                .then((favorites) => {
                    console.log('Favorite Deleted ', favorites);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorites);
                }, (err) => next(err));
            }
            else {
                err = new Error('Dish ' + req.params.dishesId + ' not found');
                err.status = 404;
                return next(err);
            }
        }
        else {
            err = new Error('Favorites not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = favouriteRouter;