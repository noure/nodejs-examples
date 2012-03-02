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

// traverse files in directory
var run = function() {
    myUtils.walk(settings.directory, function(err, files) {
        console.log(files.length);
        if(err) {
            console.error("Could not open file: %s", err);
            // exit the hard way
            process.exit(1);
        } else {


//            for(var i = 0; i < files.length; i++) {
//                processing(files[i], function() {});
//            }

        }
    });

    function foo(file, callback) {
        console.log("processing:" + file);
        callback();
    };
};

run();
