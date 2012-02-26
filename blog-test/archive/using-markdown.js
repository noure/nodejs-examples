// use the markdown module https://github.com/evilstreak/markdown-js
var Markdown = require("markdown");
var input = "# Heading\n\nParagraph";
var output = Markdown.markdown.toHTML( input );
console.log( output );

/*
    Converts markdown formatted text to JsonML.
    Uses Maruku dialect which makes processing of meta-data possible.
    data: markdown formatted text
*/
function markdownToJson(data){
    var output = Markdown.markdown.parse(data, "Maruku");
    // accessing the meta-data
    console.log("accessing meta-data 'name'"+output[1].name);
    console.log(output);
}

markdownToJson("name:the name\n\n# Heading\n\nParagraph");
