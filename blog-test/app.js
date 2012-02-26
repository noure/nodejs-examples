#!/usr/bin/env node
// use the markdown module https://github.com/evilstreak/markdown-js
var Markdown = require("markdown");
var input = "title:the title" + "\n\n"
            + "author:Michael R. Lange" + "\n\n"
            + "#A First Level Heading" + "\n\n"
            + "A paragraph.";
// make JSON ML Tree
var outputOld = Markdown.markdown.parse(input);
// remove the meta-data expects the markdown to contain meta-data until the first header
var outputNew = new Array();
var metaData = new Array();
var remove = true;
var splitMetaElement = function(element) {
    return element.split(":");
}
// clone the json
for (var i = 0; i < outputOld.length; i++) {
    // if element is type paragraph, extract the meta-data, remove from tree
    if (outputOld[i][0] == 'para' && remove) {
        var metaElement = splitMetaElement(outputOld[i][1]);
        metaData.push(metaElement);
    } else {
        outputNew.push(outputOld[i]);
    }
    // if element is type header, end meta data processing
    if (outputOld[i][0] == 'header') {
        remove = false;
    }
}
console.log(metaData);
// make html from the json
var htmlOutput = Markdown.markdown.toHTML( outputNew );
console.log( htmlOutput );
