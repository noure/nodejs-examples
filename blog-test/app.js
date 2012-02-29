#!/usr/bin/env node
// dependencies
// async        managing control flows              https://github.com/caolan/async
// beautify     beautifies html                     http://jsbeautifier.org/
// filesystem   node.js core module                 http://nodejs.org/docs/latest/api/fs.html
// findit       Recursively walk directory trees.   https://github.com/substack/node-findit
// markdown     parser                              http://github.com/evilstreak/markdown-js/
// mustache     template engine                     https://github.com/janl/mustache.js/
// path         node.js core module                 http://nodejs.org/docs/latest/api/path.html
var async       = require("async");
var beautify    = require("beautify").js_beautify;
var fs          = require("fs");
var findit      = require("findit");
var markdown    = require("markdown").markdown;
var mustache    = require("mustache");
var path        = require("path");

function Generator(settings) {
    // general setup aka init
    this.settings = settings || this.defaultSettings();
    console.log("using settings:");
    console.log(this.settings);
    // create outputDir if needed
    // clear outputDir if it exists
    fs.rmdirSync("output");
}

Generator.prototype.commander = function(item) {

    async.waterfall([
        function preProcess(callback) {
            console.log("preProcessing:" + item.file);
            callback();
        },
        function parse(callback) {
            console.log("parsing:" + item.file);
            var parserResult = markdown.parse(item.rawdata, "Maruku");
            // split result in raw markdown tree and metadata
            item.markdown       = parserResult.slice(2);
            item.htmlContent    = markdown.toHTML(parserResult);
            item.metadata       = parserResult[1];
            callback();            
        },
        function postProcess(callback) {
            console.log("postProcessing:" + item.file);
            console.log(item);
            callback();            
        },
        function applyTemplate(callback) {
            console.log("apply template to:" + item.file);
            item.output = mustache.to_html(fs.readFileSync(item.template, "UTF-8"), item);
            callback();
        },
        function beautifyhtml(callback) {
            console.log("beautifying the html:" + item.file);
            item.prettyOutput = beautify(item.output);
            callback();
        },
        function write(callback) {
            console.log("writing:" + item.file);
            // writing asynchronously, should be ok
            fs.writeFile(item.outputFile, item.prettyOutput, function (err) {
              if (err) throw err;
              console.log('created:' + item.outputFile);
            });
            callback();
        }
    ],
    function (err, result) {
           console.log("commander done");
           console.log(item);
    });
}

Generator.prototype.run = function() {
    this.processFiles(this.settings, this.commander);
}

Generator.prototype.defaultSettings = function() {
    return {
        "directory"         : "articles",
        "template"          : "templates/mustache-html5-template.html",
        "templateEncoding"  : "UTF-8",
        "outputDir"         : "output"
    };
}

Generator.prototype.processFiles = function(settings, commander) {
    // run through the articles directory and pull all articles
    findit.find(settings.directory, function(file){
        // use .md files only
        if (fs.statSync(file).isFile() && file.indexOf(".md") != -1) {
            console.log("using:" + file);
            fs.readFile(file, "UTF-8", function(err,data){
                if(err) {
                    console.error("Could not open file: %s", err);
                    // exit the hard way
                    process.exit(1);
                } else {
                    console.log("reading:" + file);
                    var item = { "file"         : file,
                                 "rawdata"      : data,
                                 "template"     : settings.template,
                                 "outputDir"    : settings.outputDir,
                                 "outputFile"   : settings.outputDir + 
                                                  path.basename(file, ".md") + ".html"
                    };
                    commander(item);
                }
            });
        }
    });
}

var generator = new Generator();
//generator.run();