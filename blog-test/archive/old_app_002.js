#!/usr/bin/env node
// dependencies
var fs = require("fs"); // filesystem node.js core module http://nodejs.org/docs/latest/api/fs.html
var findit = require("findit"); // Recursively walk directory trees. https://github.com/substack/node-findit
var markdown = require("markdown").markdown; // markdown parser http://github.com/evilstreak/markdown-js/
/*
    
*/
function MyStaticSiteGenerator(settings) {
    this._settings = this.checkSettings(settings);
};
MyStaticSiteGenerator.prototype.checkSettings = function(settings) {
        var _settings = settings || this.defaultSettings();
        console.log("using properties:");
        console.log(_settings);
        return _settings;
};
MyStaticSiteGenerator.prototype.defaultSettings = function() {
    return {
            "directory": "./articles",
            "template": "templates/mustache-html5-template.html",
            "templateEncoding": "UTF-8"
            };
};
MyStaticSiteGenerator.prototype.run = function() {
    // first get files to act on, synchronously
    this.processFiles(this._settings.directory);
    // callback function style
    // foreach file: read() {
    //      preProcessRaw() - handle metaData, add to global ReturnObject
    //      parseRaw()
    //      postParseProcess() - includes templating?
    //      templating()
    //      postProcess()
    // }
    // return global ReturnObject 
    // postprocess on data, like creating a rss feed? or do this in postprocessing?
};

MyStaticSiteGenerator.prototype.processFiles = function(directory) {
    if (directory) {
        // run through the articles directory and pull all articles
        findit.find(directory, function(file){
            // show what it's doing
            console.log("traversing:" + file);
            // there is no need yet to distinguish .md files
            // read the file
            if (fs.statSync(file).isFile() && file.indexOf(".md") != -1) {
                console.log("using:" + file);
                //
            }            
        });
    } else {
        console.log("setting property 'directory' is needed, see settings documentation");
    }
};

MyStaticSiteGenerator.prototype.readFile = function(file, action) {
    fs.readFile(file, "UTF-8", function(err,data){
        if(err) {
            console.error("Could not open file: %s", err);
            process.exit(1);
        } else {
        console.log("reading:" + file);
        //action(data);
        }
    });
}


MyStaticSiteGenerator.prototype.parse = function(data) {
    if (file) {
        console.log("parsing:" + file);
        
    } else {
        console.log("no file for parsing provided");
    }

    function markdownToJson(data){
        return Markdown.markdown.parse(data, "Maruku");
    }
}

var generator = new MyStaticSiteGenerator();
generator.run();

