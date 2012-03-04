#!/usr/bin/env node
var async       = require("async"); // https://github.com/caolan/async async tools
var beautify    = require("./lib/beautify").js_beautify; // http://jsbeautifier.org/
var fs          = require("fs"); // http://nodejs.org/docs/latest/api/fs.html node.js core filesystem
var path        = require("path"); // http://nodejs.org/docs/latest/api/path.html node.js core for path operations
var markdown    = require("markdown").markdown; // http://github.com/evilstreak/markdown-js/ markdown parser
var mustache    = require("mustache"); // https://github.com/janl/mustache.js/ template engine
var rss         = require('rss'); // https://github.com/dylang/node-rss
var myUtils     = require("./lib/utils");

var feed = new rss({
    title: 'title',
    description: 'description',
    feed_url: 'http://emerpe.de/rss.xml',
    site_url: 'http://emerpe.de',
    image_url: 'http://emerpe.de/icon.png',
    author: 'Dylan Greene'
});

var feedTemp = [];

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
            item.template   = settings.template;
            // first value is error
            callback(null, item);
        },
        function parse(item, callback) {
            var parserResult = markdown.parse(item.rawdata, "Maruku");
            // split result in raw markdown tree and metadata
            item.markdown       = parserResult.slice(2);
            item.htmlContent    = markdown.toHTML(parserResult);
            item.metadata       = parserResult[1];
            // shall publish?
            if(item.metadata && item.metadata.published == "true") {
                callback(null, item);
            } else {
                item = null;
                // exit
                callback("exit");
            }
        },
        function addFeedItem(item, callback) {
            feedTemp.push(
                {
                    title:  item.metadata.title,
                    description: 'use this for the content. It can include html.',
                    url: 'http://example.com/article4' + item.file, // link to the item
                    //guid: '1123', // optional - defaults to url
                    author: item.metadata.author, // optional - defaults to feed author property
                    date: item.metadata.date // any format that js Date can parse.
                }
            );
            callback(null, item);
        },
        function applyTemplate(item, callback) {
            item.output = mustache.to_html(fs.readFileSync(item.template, "UTF-8"), item);
            callback(null, item);
        },
        function beautifyhtml(item, callback) {
            //console.log("beautifying the html:" + item.file);
            item.prettyOutput = beautify(item.output);
            callback(null, item);
        },
        // sync or async ?
        function write(item, callback) {
            fs.writeFile(item.outputFile, item.prettyOutput, function (err) {
                if (err) throw err;
                console.log('created:' + item.outputFile);
            });
            callback(null, item);
        },
        function clean(item, callback) {
            item = null;
            callback("done");
        }
    ], function (err, result) {
        if(err == "done") {
            console.log(err);
        }
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
                // finish task
                callback();
            }
        });
        return;
    };
};

// create a queue object with concurrency 100, my osx allows max 256 open files (use ulimit -a)
// but the process method writes too - thus using another 100 files for writing
var q = async.queue(function (task, callback) {
    // without process.nextTick 
    // processFile(task, callback);
    function doIt() {
        processFile(task, callback);
    };
    process.nextTick(doIt);
}, 100);

// traverse files in directory
var run = function() {
    var result = []
    myUtils.walk(settings.directory, function(err, files) {
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



// assign a callback for the end of the queue
q.drain = function() {
    console.log('all items have been processed');
    console.log((new Date().getTime() - now)/1000);
    // create rss
    feedTemp.forEach(function(item) {
        feed.item(item);
    })
    console.log(beautify(feed.xml()));
}

var now = new Date().getTime();

run();