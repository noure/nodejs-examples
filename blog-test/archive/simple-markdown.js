// use the markdown module https://github.com/evilstreak/markdown-js
var input = "# Heading\n\nParagraph";
var output = require( "markdown" ).markdown.toHTML( input );
console.log( output );