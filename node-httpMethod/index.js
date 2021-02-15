const http=require('http');
const hostname='localhost';
const fs=require('fs');
const path=require('path');
const port=3000;
 
const server=http.createServer((req,res) => {
 
    console.log("Request for"+req.url+"by"+req.method);

     if(req.method == 'GET'){
         var fileUrl;
         if(req.url=='/') 
         fileUrl='/aboutus.html';
         else fileUrl=req.url;
         var filePath=path.resolve('./public'+fileUrl);
         const fileExt=path.extname(filePath);
         if (fileExt == '.html'){
             fs.exists(filePath, (exists) => {
                 if(!exists)
                {
                     res.statusCode=404;
                     res.setHeader('Content-type','text/html');
                     res.end('<html><body><h1>Error 404'+fileUrl+'not found</h1></body></html>');
                     return;

                }
                     res.statusCode=200;
                     res.setHeader('Content-type','text/html');
                     fs.createReadStream(filePath).pipe(res);
            });
         }
                
                else
                {
                    res.statusCode=404;
                     res.setHeader('Content-type','text/html');
                     res.end('<html><body><h1>File Extension not html'+fileUrl+'</h1></body></html>');

                }
             }

            else
            {
                res.statusCode=404;
                res.setHeader('Content-type','text/html');
                res.end('<html><body><h1>Req method not supported'+req.method+'</h1></body></html>');
            }
         })
     

server.listen(port,hostname, () => {
    console.log(`Server listening at http://${hostname}:${port}`);

})