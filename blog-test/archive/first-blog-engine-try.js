// dependencies
var 
    Fs = require('fs'),
    Markdown = require('markdown'),
    Plates = require('plates');

// provide template as globale variable
var template;
// use readFile synchronously
template = Fs.readFileSync('templates/simple-html5-template.html', 'utf-8');

// read markdown file with utf-8 encoding, this time asynchronously
Fs.readFile('articles/hello-world.md', 'utf-8', function(err,data){
    if(err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
    }
    // parse with markdown https://github.com/evilstreak/markdown-js
    var mdOutput = Markdown.markdown.toHTML(data);
    var data = { "content": mdOutput };
    var output = Plates.bind(template, data);
    console.log(output);
});
