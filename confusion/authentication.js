var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;
var User=require('./models/users');
var jwtStrategy=require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt;
var jwt=require('jsonwebtoken');
var config=require('./config');

exports.local=passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken =function(user) {
    return jwt.sign(user,config.secretKey,{expiresIn:36000});
};

var opts={};

opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=config.secretKey;

exports.jwtPassport=passport.use(new jwtStrategy(opts,(jwt_payload,done) => {
    console.log("JWT payload",jwt_payload);
    User.findOne({_id:jwt_payload._id},(err,user) => {
        if(err){
             return done(err,false)
        }
        else if(user){
            return(null,user)
        }
        else {
            return(null,false)
        }
    });
}));

exports.verifyUser=passport.authenticate('jwt',{session:false});