// use the markdown module https://github.com/evilstreak/markdown-js
var Marked = require("marked");
var input = "# Heading\n\nParagraph";
var output = Marked( input );
console.log( output );