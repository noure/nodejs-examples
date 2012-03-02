#!/usr/bin/env node
var async       = require("async"); // https://github.com/caolan/async async tools
var fs          = require("fs"); // http://nodejs.org/docs/latest/api/fs.html node.js core filesystem
var path        = require("path"); // http://nodejs.org/docs/latest/api/path.html node.js core for path operations
var markdown    = require("markdown").markdown; // http://github.com/evilstreak/markdown-js/ markdown parser
var mustache    = require("mustache"); // https://github.com/janl/mustache.js/ template engine


var myUtils     = require("./lib/utils");

var settings = {
    "directory"         : "articles",
    "template"          : "templates/mustache-html5-template.html",
    "templateEncoding"  : "UTF-8",
    "outputDir"         : "output"
};

var processItem = function(file, rawdata) {
    async.waterfall([
        function createItem(callback) {
            // create item
            var item        = {};
            item.outputFile = path.join(settings.outputDir, path.basename(file, ".md") + ".html");
            item.file       = file;
            item.rawdata    = rawdata;
            callback(null, item);
        },
        function parse(item, callback) {
            var parserResult = markdown.parse(item.rawdata, "Maruku");
            // split result in raw markdown tree and metadata
            item.markdown       = parserResult.slice(2);
            item.htmlContent    = markdown.toHTML(parserResult);
            item.metadata       = parserResult[1];
            callback(null, item);
        },
        function write(item, callback) {
            fs.writeFile(item.outputFile, item.htmlContent, function (err) {
                if (err) throw err;
                console.log('created:' + item.outputFile);
            });
            callback(null, item);
        },
        function clean(item, callback) {
            item = null;
            callback(null, "done");
        }
    ], function (err, result) {
       // result now equals 'done'
    });
}

var processFile = function(file, callback) {
    if (fs.statSync(file).isFile() && file.indexOf(".md") != -1) {
        readFile(file);
    } else {
        callback();
    }
    // early return
    return;

    function readFile(file) {
        fs.readFile(file, "UTF-8", function(err,data){
            if(err) {
                console.error("Could not open file: %s", err);
                // exit the hard way
                process.exit(1);
            } else {
                //console.log("reading:" + file);
                processItem(file,data);
                //var item = createItem(file, data);
                //parse(item);
                //write(item);
                //clean(item);
                // finish task
                callback();
            }
        });
        return;
    };
    function createItem(file, rawdata) {
        // create item
        var item        = {};
        item.outputFile = path.join(settings.outputDir, path.basename(file, ".md") + ".html");
        item.file       = file;
        item.rawdata    = rawdata;
        return item;
    };
    function parse(item) {
        var parserResult = markdown.parse(item.rawdata, "Maruku");
        // split result in raw markdown tree and metadata
        item.markdown       = parserResult.slice(2);
        item.htmlContent    = markdown.toHTML(parserResult);
        item.metadata       = parserResult[1];
    };
    function write(item) {
        fs.writeFile(item.outputFile, item.htmlContent, function (err) {
            if (err) throw err;
            console.log('created:' + item.outputFile);
        });
        return;
    };
    function clean(item) {
        item = null;
        return;
    };
};

// create a queue object with concurrency 100, my osx allows max 256 open files (use ulimit -a)
// but the process method writes too - thus using another 100 files for writing
var q = async.queue(function (task, callback) {
    processFile(task, callback);
}, 100);
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
                    //console.log('finished processing:' + this.data);
                });
            }
        }
    });
};

run();
