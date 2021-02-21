const mongoose=require('mongoose');
const Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency=mongoose.Types.Currency;

var promotionsSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    label:{
        type:String,
        default: ''
    },
    price:{
        type: Currency,
        required:true
    },
    featured:{
        type:Boolean,
        default:false

    }

},{
    timestamps:true
});

var Promotions=mongoose.model('Promotion',promotionsSchema);

module.exports=Promotions;