const express=require('express');
const http=require('http');
const hostname='localhost';
const port=3000;
const dishRouter=require('./router/dishRouter');
const promoRouter=require('./router/promoRouter');
const leaderRouter=require('./router/leaderRouter');
const morgan=require('morgan');
const bodyParser=require('body-parser');

 
const app=express();
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use('/dishes',dishRouter);

app.use('/leaders',leaderRouter);
app.use('/promotions',promoRouter);

app.use((req,res,next)  => {
    
    res.statusCode=200;
    res.setHeader('Content-type','text/html');
    res.end('<html><body><h1>This is a express server</h1></body></html>');

});

const server=http.createServer(app);

server.listen(port,hostname, () =>{
    console.log(`This is a server listening to http://${hostname}:${port}`)
});