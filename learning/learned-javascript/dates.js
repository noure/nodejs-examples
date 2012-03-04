// only printing Date will give the wrong data
var now = new Date();
console.log(now);
console.log(now.toString());
console.log(now.toGMTString());

var test = new Date("2012-03-03 23:59:00 GMT+0100");

console.log(test.toString());
console.log(test.toGMTString());


