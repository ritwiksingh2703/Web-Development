const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var passportlocalmongoose=require('passport-local-mongoose');

var User=new Schema({
    firstname:{
        type: String,
        default:''
    },
    lastname:{
        type: String,
        default:''
    },
    facebookId: String,
   
    admin:{
        type:Boolean,
        default: false
    }
});

User.plugin(passportlocalmongoose);

module.exports=mongoose.model('User',User);