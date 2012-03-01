#!/usr/bin/env node
// doc at hand
//  http://blog.mixu.net/2011/02/02/essential-node-js-patterns-and-snippets/
//  http://docs.nodejitsu.com/articles/javascript-conventions/using-ECMA5-in-nodejs
//  http://book.mixu.net/ch5.html
//  http://nodebits.org/distilled-patterns
//  http://hueniverse.com/2011/06/the-style-of-non-blocking/
//
// dependencies
// async        managing control flows              https://github.com/caolan/async
// beautify     beautifies html                     http://jsbeautifier.org/
// filesystem   node.js core module                 http://nodejs.org/docs/latest/api/fs.html
// findit       Recursively walk directory trees.   https://github.com/substack/node-findit
// markdown     parser                              http://github.com/evilstreak/markdown-js/
// mustache     template engine                     https://github.com/janl/mustache.js/
// path         node.js core module                 http://nodejs.org/docs/latest/api/path.html
// wrench       recursive file operations           https://github.com/ryanmcgrath/wrench-js
var async       = require("async");
var beautify    = require("beautify").js_beautify;
// exported walk function var file        = require("file");
var findit      = require("findit");
var fs          = require("fs");
var markdown    = require("markdown").markdown;
var mustache    = require("mustache");
var path        = require("path");
var wrench      = require("wrench");

// my own
var myUtils     = require("./lib/utils");

var myPool = require('poolr').createPool(100);

var defaultSettings = {
    "directory"         : "articles",
    "template"          : "templates/mustache-html5-template.html",
    "templateEncoding"  : "UTF-8",
    "outputDir"         : "output"
};

var item = {
    "template"     : "settings.template",
    "outputDir"    : "settings.outputDir"
    //"outputFile"   : "path.join(settings.outputDir, path.basename(file, ".md") + ".html")" 
};

var commander = function(file) {
    readFile(file);
    return;
    function readFile(file) {
        fs.readFile(file, "UTF-8", function(err,rawdata){
            if(err) {
                console.error("Could not open file: %s", err);
                // exit the hard way
                process.exit(1);
            } else {
                createItem(file, rawdata);
            }
        });
        return;
    };
    function createItem(file, rawdata) {
        // create item
        var item = { "file"         : file,
                     "rawdata"      : rawdata
        };
        preProcess(item);
        return;
    };
    function preProcess(item) {
        parse(item);
        return;
    };
    function parse(item) {
        //var parserResult = markdown.parse(item.rawdata, "Maruku");
        // split result in raw markdown tree and metadata
        //item.markdown       = parserResult.slice(2);
        //item.htmlContent    = markdown.toHTML(parserResult);
        //item.metadata       = parserResult[1];
        postProcess(item);
        return;
    };
    function postProcess(item) {
        applyTemplate(item);
        return;
    };
    function applyTemplate(item) {
        //item.output = mustache.to_html(fs.readFileSync(item.template, "UTF-8"), item);
        beautifyhtml(item);
        return;
    };
    function beautifyhtml(item) {
        //item.prettyOutput = beautify(item.output);
        write(item);
        return;
    };
    function write(item) {
        //fs.writeFile(item.outputFile, item.prettyOutput, function (err) {
        //    if (err) throw err;
        //});
        clean(item);
        return;
    };
    function clean(item) {
        item = null;
        return;
    };
}

var Generator = function Generator(settings) {
    this.settings = settings || defaultSettings;
};

Generator.prototype.run = function() {
    var settings = this.settings;
    myUtils.walk(settings.directory, function callback(nullValue, dirPath, dirs, files) {
        if (files && files.length > 0) {
            for(i=0; i < files.length; i++){
                myPool.addTask(commander(files[i]), function(err) {
                        if (err) throw err;    
                });
            }
        }
    });
};

var generator = new Generator();
generator.run();