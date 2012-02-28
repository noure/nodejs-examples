// learning with http://eloquentjavascript.net/chapter2.html
// --------------------------------------------------
console.log("print even numbers:");
for (var number = 0; number <= 12; number += 2) {
  console.log(number);
}
// --------------------------------------------------
console.log("print sum of numbers til 10:");
var number = 0;
for (var count = 0; count <= 10; count++) {
    number += count;
}
console.log(number);
// --------------------------------------------------
var result = 1;
for (var count = 0; count < 10; count++) {
    result *= 2;
}
console.log("calculating 2^10:" + result);
// --------------------------------------------------
console.log("drawing a triangle");
var line = "";
for (var count = 0; count < 10; count++) {
    line += "#";
    console.log(line);
}
// --------------------------------------------------
console.log("for loop with break");
for (var current = 20; ; current++) {
  if (current % 7 == 0)
    break;
}
// interesting to see we can access the for counter after the loop
console.log(current);
// --------------------------------------------------
// using continue
for (var i = 0; i < 10; i++) {
    if (i % 3 != 0)
        continue;
    console.log(i, " is divisible by three.");
}