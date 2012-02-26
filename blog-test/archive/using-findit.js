// running through directories with findit https://github.com/substack/node-findit
// dependencies
var 
    Findit = require("findit");

Findit.find(".", function(file){
    console.log(file);
});