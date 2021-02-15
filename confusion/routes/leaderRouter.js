const express=require('express');
const bodyParser=require('body-parser');
const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')


.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) =>{
    res.end('Will send all the leaders to you!');

})
.post((req,res,next) =>{
    res.end('Will add the leader with'+req.body.name+'and with description'+req.body.description);
})
.put((req,res,next) =>{
    res.statusCode=403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
    res.end('Deleting the leader');
})
leaderRouter.route('/:leaderId')



.get((req,res,next) =>{
    res.end('Will send all the leaders to you with leaderId'+req.params.leaderId);

})
.post((req,res,next) =>{
    res.statusCode=403;
    res.end('POST operation not supported');
})
.put((req,res,next) =>{
    res.write('Updating the leader with'+req.params.leaderId);
    res.end('Will update the leader with leaderId'+req.params.leaderId+'with name'+req.body.name+'and with description'+req.body.description);

})
.delete((req,res,next) => {
    res.end('Deleting the leader with ID'+req.params.leaderId)
});


module.exports= (leaderRouter); 
