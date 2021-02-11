const express=require('express');
const http=require('http');
const hostname='localhost';
const port=3000;
const dishRouter=require('./router/dishRouter');
const morgan=require('morgan');
const bodyParser=require('body-parser');

 
const app=express();
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use('/dishes',dishRouter);




app.get('/dishes/:dishesId',(req,res,next) =>{
    res.end('Will send all the dishes to you with dishId'+req.params.dishesId);

});
app.post('/dishes/:dishesId',(req,res,next) =>{
    res.statusCode=403;
    res.end('POST operation not supported');
});
app.put('/dishes/:dishesId',(req,res,next) =>{
    res.write('Updating the dish with'+req.params.dishesId);
    res.end('Will update the dish with dishId'+req.params.dishesId+'with name'+req.body.name+'and with description'+req.body.description);

});
app.delete('/dishes/:dishesId',(req,res,next) => {
    res.end('Deleting the dish with ID'+req.params.dishesId)
});


app.use((req,res,next)  => {
    
    res.statusCode=200;
    res.setHeader('Content-type','text/html');
    res.end('<html><body><h1>This is a express server</h1></body></html>');

});

const server=http.createServer(app);

server.listen(port,hostname, () =>{
    console.log(`This is a server listening to http://${hostname}:${port}`)
});