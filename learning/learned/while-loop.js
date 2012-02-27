// util formerly known as sys
var util = require("util");
var total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
// simple logging to stdout, does not fancy object inspecting things
// see http://stackoverflow.com/questions/3904273/difference-between-console-log-and-sys-puts-in-node-js
util.puts(total);