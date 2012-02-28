// lerning with http://eloquentjavascript.net/chapter2.html
// simple while loop
var total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log("sum of all numbers til 10:" + total);

var result = 1;
var count = 0;
while (count < 10) {
    result = result * 2;
    count = count + 1;
}
console.log("calculating 2^10:" + result);

console.log("drawing a triangle");
var line = "";
var counter = 0;
while (counter < 10) {
  line = line + "#";
  console.log(line);
  counter = counter + 1;
}