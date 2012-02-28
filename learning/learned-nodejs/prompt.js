// using https://github.com/flatiron/prompt
// seems to be async by default, starting another prompt interferes with the first one
var prompt = require('prompt');

//
// Start a prompt
//
prompt.start();

/*
    Simple prompt asking for the result of 2+2
*/
prompt.get([{name:"result", message:"What is 2+2?"}], function (err, result) {    
    var answer = Number(result.result);
    if (answer == 4) {
        console.log("nice!");
    } else if(answer == 3 || answer == 5) {
        console.log("almost!");
    } else {
        console.log("try again!");
    }
})
