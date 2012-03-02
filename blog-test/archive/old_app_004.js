#!/usr/bin/env node
// doc at hand
//  http://blog.mixu.net/2011/02/02/essential-node-js-patterns-and-snippets/
//  http://docs.nodejitsu.com/articles/javascript-conventions/using-ECMA5-in-nodejs
//  http://book.mixu.net/ch5.html
//  http://nodebits.org/distilled-patterns
//  http://hueniverse.com/2011/06/the-style-of-non-blocking/
//
// https://github.com/caolan/async async tools
var async       = require("async");
// http://jsbeautifier.org/ code beautifier
var beautify    = require("beautify").js_beautify;
// https://github.com/substack/node-findit recursive file operations
var findit      = require("findit");
// http://nodejs.org/docs/latest/api/fs.html node.js core filesystem
var fs          = require("fs");
// // http://github.com/evilstreak/markdown-js/ markdown parser
var markdown    = require("markdown").markdown;
// // https://github.com/janl/mustache.js/ template engine
var mustache    = require("mustache");
// http://nodejs.org/docs/latest/api/path.html node.js core for path operations
var path        = require("path");
// https://github.com/coopernurse/node-pool pool library
var poolModule = require('generic-pool');
// https://github.com/codingforce/poolr
var poolr = require('poolr').createPool;
// https://github.com/ryanmcgrath/wrench-js recursive file operations
var wrench      = require("wrench");
// my own
var myUtils     = require("./lib/utils");

var settings = {
    "directory"         : "articles",
    "template"          : "templates/mustache-html5-template.html",
    "templateEncoding"  : "UTF-8",
    "outputDir"         : "output"
};


var Generator = function(settings) {
    this.settings = settings;
}

Generator.prototype.startProcessing = function(file) {
    console.log("starting");
    // use .md files only
    if (fs.statSync(file).isFile() && file.indexOf(".md") != -1) {
        readFile(file);
    }

    function readFile(file) {
        fs.readFile(file, "UTF-8", function(err,data){
            if(err) {
                console.error("Could not open file: %s", err);
                // exit the hard way
                process.exit(1);
            } else {
                createItem(file, data);
            }
        });
        return;
    };
    function createItem(file, rawdata) {
        // create item
        var item = new Item(settings, file);
        item.file = file;
        item.rawdata = rawdata;
        return;
    };
    function write(item) {
        fs.writeFile(item.outputFile, item.data, function (err) {
            if (err) throw err;
            console.log('created:' + item.outputFile);
            clean(item);
        });
        return;
    };
    function clean(item) {
        console.log(item);
        item = null;
        return;
    };
    return;
};

var Item = function(settings, file) {
    this.outputFile = path.join(settings.outputDir, path.basename(file, ".md") + ".html");
}

var generator = new Generator(settings);
var myPool = poolr(10, generator);

// standard article object

var preProcess = function(item) {
    parse(item);
    return;
};
var parse = function(item) {
    postProcess(item);
    return;
};
var postProcess = function(item) {
    applyTemplate(item);
    return;
};
var applyTemplate = function(item) {
    beautifyOutput(item);
    return;
};
var beautifyOutput = function(item) {
    write(item);
    return;
};


// traverse files in directory
var run = function() {
    myUtils.walk(settings.directory, function(err, files) {
        if(err) {
            console.error("Could not open file: %s", err);
            // exit the hard way
            process.exit(1);
        } else {
            for(var i = 0; i < files.length; i++ ) {
                myPool.addTask(generator.startProcessing, files[i], function(err, res) {
                });
            }
        }
        return;
    });
    return;
};
run();