#!/usr/bin/env node
// https://github.com/codingforce/poolr
var poolr = require("poolr").createPool;
var myUtils = require("./lib/utils");

var settings = {
    "directory"         : "articles",
    "template"          : "templates/mustache-html5-template.html",
    "templateEncoding"  : "UTF-8",
    "outputDir"         : "output"
};


var Generator = function(settings) {
    this.settings = settings;
}

Generator.prototype.processing = function(file, callback) {
    console.log("processing:" + file);
    callback();
    return;
};

// traverse files in directory
var run = function() {
    var generator = new Generator(settings);
    var myPool = poolr(2, generator);
    myUtils.walk(settings.directory, function(err, files) {
        if(err) {
            console.error("Could not open file: %s", err);
            // exit the hard way
            process.exit(1);
        } else {
            for(var i = 0; i < files.length; i++ ) {
                myPool.addTask(generator.startProcessing, files[i], function(err, res) {
                    if (err) throw err;
                });
            }
        }
        return;
    });
    return;
};

run();

function processingEntry(entries, index) {
    var index = index || 0;
    if (index === entries.length) return done();

    doSomething(entries[index]);

    process.nextTick(function() {
        processEntry(entries, i++);
    });
}