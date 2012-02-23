// use the markdown module
var input = "# Heading\n\nParagraph";
var output = require( "markdown" ).markdown.toHTML( input );
console.log( output );