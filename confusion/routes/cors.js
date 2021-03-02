const express=require('express');
const cors=require('cors');
const app=express();

const whitelist=['https://localhost:3443','http://localhost:3000'];
const corsOptionDelegate= (req,callback) => {
    var corsOptions;
    if(whitelist.indexOf(req.header('Origin'))!==-1)
    {
        corsOptions={origin:true};
    }
    else{
        corsOptions= {option:false};
    }
    callback(null,corsOptions);
};
exports.cors=cors();
exports.corswithOptions=cors(corsOptionDelegate);