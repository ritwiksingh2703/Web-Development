/*var fs=require('fs');
fs.appendFile("random1.txt","Heelo",function(err,data){
    if (err) throw err;
    console.log("saved");
});*/
var fs1=require('fs');
fs1.unlink("random6.txt",function(err){
    
    console.log("Deleted");
});
