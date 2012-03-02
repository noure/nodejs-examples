#!/usr/bin/env node
var async       = require("async"); // https://github.com/caolan/async async tools
var fs = require("fs"); // http://nodejs.org/docs/latest/api/fs.html node.js core filesystem
var myUtils = require("./lib/utils");

var settings = {
    "directory"         : "articles",
    "template"          : "templates/mustache-html5-template.html",
    "templateEncoding"  : "UTF-8",
    "outputDir"         : "output"
};

var processFile = function(file, callback) {
    console.log("processing:" + file);
    readFile(file);
    return;
    function readFile(file) {
        fs.readFile(file, "UTF-8", function(err,data){
            if(err) {
                console.error("Could not open file: %s", err);
                // exit the hard way
                process.exit(1);
            } else {
                //createItem(file, data);
                console.log("reading:" + file);
                // finish task
                callback();
            }
        });
        return;
    };
};
// create a queue object with concurrency 200, my osx allows max 256 open files (use ulimit -a)
var q = async.queue(function (task, callback) {
    processFile(task, callback);
}, 200);
// assign a callback
q.drain = function() {
    console.log('all items have been processed');
}

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
                q.push(file, function (err) {
                    console.log('finished processing:' + file);
                });
            }
        }
    });

};

run();
