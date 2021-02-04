console.log('hello');
//alert('yo');
//var age=prompt('what is your age?');
//document.getElementById('someText').innerHTML=age;
function greeting(str1){
   
    var name='Hello '+ str1;
    console.log(name);
}
//var x=prompt('what is your name?');
//greeting(x);
var x='banana';
console.log(x.split(','));
console.log(x.slice(2,6));
console.log(x.replace('ban', 123));
let fruits=['banana','apple','pear'];
console.log(fruits[2]);
for(var i=0;i<fruits.length;i++)
{
    console.log(fruits[i]);
}
console.log(fruits.toString());
console.log(fruits.join('*'));
console.log(fruits.pop());
console.log(fruits.push('blackberry'),fruits);
console.log(fruits.shift());
console.log(fruits.unshift('kiwi'),fruits);
let vegetables=['brocolli','brinjal','cauliflower'];
console.log(fruits.concat(vegetables));
console.log(fruits.reverse());
console.log(fruits.sort());
let numbers=['1','2','3','4','5'];
console.log(numbers.sort(function(a,b) {return a-b}));
console.log(numbers.sort(function(a,b) {return b-a}));
let student={first:'Ritwik',last:'Singh',age:'20',studentInfo: function(){
    return this.first + '\n' + this.last
}};
console.log(student.first);
console.log(student.last);
student.first='Ritu';
console.log(student.first);
console.log(student.studentInfo());
