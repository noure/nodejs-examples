// util formerly known as sys
var util = require("util");
// simple logging to stdout, does not fancy object inspecting things
// see http://stackoverflow.com/questions/3904273/difference-between-console-log-and-sys-puts-in-node-js
util.puts("logging with util");

// works with arrays too
var someArray = ["foo", "bar", "foobar"];
util.puts("an array: " + someArray); // prints only [object]

// does not work - out of the box - with objects
var someObject = {"id": 1, "name": "foo"};
util.puts("an object: " + someObject); // prints only [object]

// but object inspecting can be done too
var otherObject = {"id": 1, "name": "foo"};
util.puts("an inspected object: " + util.inspect(otherObject, true, null)); // prints object contents

// logging with console - a node.js global: http://nodejs.org/docs/latest/api/globals.html#console
console.log("logging with console");

// console.log() does inspect out of the box
var anotherObject = {"id": 1, "name": "foo"};
console.log("an inspected object(console can't do it concatenated):");
console.log(anotherObject);