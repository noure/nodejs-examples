#!/usr/bin/env node
// dependencies
var fs = require("fs"); // filesystem node.js core module http://nodejs.org/docs/latest/api/fs.html
var findit = require("findit"); // Recursively walk directory trees. https://github.com/substack/node-findit

var myStaticBlog = {
    // main
    
    // setup
    settings : {
                "directory": "./articles",
                "template": "templates/mustache-html5-template.html",
                "templateEncoding": "UTF-8"
                },
    traverseDirectory : function(directory, simpleAction) {
        // async style traversing directory
        findit.find(this.settings.directory, function(file){
            // show what it's doing
            //console.log("traversing:" + file);
            // reading .md files only
            if (fs.statSync(file).isFile() && file.indexOf(".md") != -1) {
                this.simpleAction("processing:" + file);
            }
        });
    },
    simpleAction : function(msg){
        console.log(msg);
    }
};

myStaticBlog.traverseDirectory();