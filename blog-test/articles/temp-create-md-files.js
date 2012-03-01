var fs = require("fs");
// need pooling, limit of 250 open files (could be raised with ulimit...)
var myPool = require('poolr').createPool(100); // https://github.com/codingforce/poolr
for(i=0; i < 10000; i++) {
    myPool.addTask(fs.writeFile, "test-articles/" + i + "file.md", "#header" + i, function(err) {
        if (err) throw err;    
    })
}