var fs = require("fs"); // http://nodejs.org/docs/latest/api/fs.html node.js core filesystem
var Step = require("step"); // https://github.com/creationix/step

var processFile = function() {
    Step(
        function readSelf() {
            fs.readFile(__filename, this);
        },
        function doSomething(err, text) {
            console.log("" +text);
            if (err) throw err;
            return text;
        }
    );
}

var process = function(i) {
    Step(
      function first() {
        console.log(i);
      }        
    );
}

console.log("testing maximum capabilities");
var asyncTest = function() {
    for(var i = 0; i < 10000; i++) {
        Step(
          function first() {
            process(i);
            processFile();
          }
        );
    }
};

asyncTest();