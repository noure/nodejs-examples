#!/usr/bin/env node
/*
    * traverse a directory
    * read files
    * convert files from markdown to JsonMl
    * extract meta-data
    * convert JsonMl to html
    * fill html into template 
*/

var Beautify = require("beautify").js_beautify,
    Findit = require("findit"),
    Fs = require("fs"),
    Markdown = require("markdown"),
    Mustache = require("mustache");

// setup
var settings = {
                "directory": "./articles",
                "template": "templates/mustache-html5-template.html",
                "templateEncoding": "UTF-8"
                };
// used template
var template = Fs.readFileSync(settings.template, settings.templateEncoding);

// run through the articles directory and pull all articles
Findit.find(settings.directory, function(file){
    // show what it's doing
    console.log("traversing:" + file);
    // there is no need yet to distinguish .md files
    // read the file
    if (Fs.statSync(file).isFile() && file.indexOf(".md") != -1) {
        processFile(file, "UTF-8");
    }
});

/*
    file: string
    encoding: e.g. utf-8
*/
function processFile(file, encoding) {
    console.log("processing:" + file);
    Fs.readFile(file, encoding, function(err,data){
        if(err) {
            console.error("Could not open file: %s", err);
            process.exit(1);
        }
        var jsonOutput = markdownToJson(data);
        // extract the metadata
        var metaData = jsonOutput[1];
        // create the html
        var htmlOutput = Markdown.markdown.toHTML(jsonOutput);
        // run through template engine
        var data = {    
                    "author"    : metaData.author, 
                    "title"     : metaData.title,
                    "content"   : htmlOutput
                    }
        var output = Mustache.to_html(template, data);

        console.log(metaData);
        console.log(Beautify(output));
    });
}
/*
    Converts markdown formatted text to JsonML.
    Uses Maruku dialect which makes processing of meta-data possible.

    data: markdown formatted text
    returns the JsonMl formatted parser output
*/
function markdownToJson(data){
    return Markdown.markdown.parse(data, "Maruku");
}