const rectangle = require('./rectangle.js');
var rect=require('./rectangle.js');
    
function solverect(l,b) {
    console.log("Solving for rectangle having length "+l+"and breadth "+b);

    rect(l,b,(err,rectangle) => {
         if(err)
         {
             console.log("Error"+err.message);

         }
         else{
             console.log("the area of the rectangle with l="+l+"and breadth"+b+"is"+rectangle.area());
             console.log("the perimeter of the rectangle with l="+l+"and breadth"+b+"is"+rectangle.perimeter());
         }
    });
    console.log("there is the time delay");
}
    

    
solverect(1,2);
solverect(-1,-2);
solverect(5,6);