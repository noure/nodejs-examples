var fs = require("fs"); // http://nodejs.org/docs/latest/api/fs.html node.js core filesystem
var poolr  = require('poolr').createPool; // https://github.com/codingforce/poolr
var myUtils = require("./lib/utils");

var settings = {
    "directory"         : "articles",
    "template"          : "templates/mustache-html5-template.html",
    "templateEncoding"  : "UTF-8",
    "outputDir"         : "output"
};

function Task() {

};

Task.prototype.processFile = function(file) {
    console.log("processing:" + file);
    readFile(file);
    return;
    function readFile(file) {
        fs.readFileSync(file, "UTF-8");
        return;
    };
};

var task = new Task();

var taskPool = poolr(2, task);

// traverse files in directory
var run = function() {
    var result = []
    myUtils.walk(settings.directory, function(err, files) {
        console.log(files.length);
        if(err) {
            console.error("Could not open file: %s", err);
            // exit the hard way
            process.exit(1);
        } else {
            for(var i = 0; i < files.length; i++) {
                var file = files[i];
                task.processFile(file);
            }
        }
    });
};

run();