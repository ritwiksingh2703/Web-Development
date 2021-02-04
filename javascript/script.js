var car = {
    maker: "volvo",
    engine: "BMW",
    pistons: {
        piston1: "xyz",
        piston2: "ytr",
    }


}
var array = [
    "Ritwik",
    "100",
    20,
    { car: "Ford" },
    function () { return 123 }

]
function name(fullname) {
    return fullname.firstname + " " + fullname.lastname;
}
console.log(name({ firstname: "Ritwik", lastname: "Singh" }));

function Apple(x, y, z, color) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color;

}
Apple.prototype = {
    eat: function () { return this; },
    throw: function () { "throw the apple" }
}
var apple1 = new Apple(1, 2, 3, "red");
var apple2 = new Apple(4, 5, 6, "yellow");
var apple3 = new Apple(7, 8, 9, "green");
var apple4 = new Apple(1, 2, 3, "pink");

function color() {
    var xyz = document.getElementById('b245');
    return xyz;

}
console.log(color());
function random() {
    var abc = document.getElementsByClassName('a23');
    return abc;
}

console.log(random());
function random1() {
    var pqr = document.querySelectorAll('p.a23');
    return pqr;

}
console.log(random1());
var var1 = document.getElementById('b245');

var1.innerText = "New";
var1.innerHTML += "order <span>html element</span>";
var var2 = document.getElementById('b245');
var2.style.background = "black";
var2.style.font = "Arial";
var2.style.width = "400px";
var2.style.color = "white";


console.log(getComputedStyle(var2));
/*function first(){
   var var4= document.getElementById('b245').innerText="Changed2";
   var4= var4+ "now again";
   return var4;
}
console.log(first());*/
var var5 = document.getElementById('btn');
var5.addEventListener('click', clicked);
var5.addEventListener('mouseout', mouseo);
var5.addEventListener('mouseover', mouseov);
function clicked() {
    document.getElementById('b245').innerText += "clicked on it";
}
function mouseo() {
    document.getElementById('b245').innerText += "Rolled mouse on it";
}
function mouseov() {
    document.getElementById('b245').innerText += "Rolled mouse over it";
}
function greet(name1) {
    console.log("happy Birthday" + name1);
}
time = setTimeout(greet, 2000, "Ritwik");
console.log(time);
clearTimeout(time);
idinterval = setInterval(greet, 1000, "Singh");
clearTimeout(idinterval);
function displaytime() {
    time = new Date();
    document.getElementById('time').innerHTML = time;
}
setInterval(displaytime, 1000);
let newdate = new Date(3020, 4, 23, 4, 55, 23);
console.log(newdate);

let var7= (a,b) => a+b;// shortcut
 let var8=["apple","banana","mango"];
 var8.forEach(func1);
  function func1(item,index) 
  {
      console.log("The items are" +  index + ":" + item);

  }
  // a this in function takes the object mentioned within the scope of the function only
  // the arrow function takes the this from external object
  
  let obj1={
      name: "ritwik",
      title : "Singh",
      Stream: "B tech"

  }
  console.log(obj1);
  let obj2=JSON.stringify(obj1);
  obj2=obj2.replace('ritwik','Singh');
  console.log(obj2);

let obj3=JSON.parse(obj2);
console.log(obj3);




