//exports.perimeter = (x,y) => 2*(x+y);
//exports.area = (x,y) => x*y;

module.exports= (x,y,callback) => {
    if(x<0 || y<0){
        setTimeout( () =>
        callback(new Error("Sorry the area and perimeter of the rectangle cannot be computated"),
        null),
        2000);
    }
        else {
            setTimeout( () =>
            callback(null,
                {
                    perimeter: () => 2*(x+y),
                    area: () => x*y
                }),
                2000
            )

        }



        
    

}

