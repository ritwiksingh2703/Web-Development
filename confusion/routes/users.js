var express = require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
var User=require('../models/users');
var passport=require('passport');
var authenticate=require('../authentication');
const users = require('../models/users');
var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/',authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
  User.find({})
  .then((user) => {
    res.statusCode=200;
    res.setHeader('Content-type','application/json');
    res.json(user);
  },
  (err) => next(err))
  .catch((err) => next(err));
});

router.post('/signup',function(req,res,next){
  User.register(new User({username:req.body.username}),req.body.password,(err,user) =>{
       
      if(err){
        res.statusCode=500;
        res.setHeader('Content-type','application/json');
        res.json({err : err})
      }
      else{
        if(req.body.firstname)
          user.firstname=req.body.firstname;
        if(req.body.lastname)
          user.lastname=req.body.lastname;
        user.save((err,user) => {
          if(err)
          {
            res.statusCode=500;
            res.setHeader('Content-type','application/json');
            res.json({err : err}) 
            return;
          }
          else{
            passport.authenticate('local')(req,res, () => {
              res.statusCode=200;
              res.setHeader('Content-type','application/json');
              res.json({success:true,status: 'Successfully registered'});
            });
          }
        });
        
       
      }
  });
 
});

router.post('/login',passport.authenticate('local'),(req,res) => {
  var token=authenticate.getToken({_id:req.user._id});
  res.statusCode=200;
  res.setHeader('Content-type','application/json');
  res.json({success:true,token:token,status: 'Logged in successfully'});
});

router.get('/logout', (req,res,next) => {
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err=new Error('You are not logged in');
    err.status=403;
    next(err);

  }
});

module.exports = router;
