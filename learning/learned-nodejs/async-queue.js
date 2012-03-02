var async = require("async"); // https://github.com/caolan/async

// create a queue object with concurrency 2

var q = async.queue(function (task, callback) {
    console.log("" + task.name);
    callback();
}, 20);

// assign a callback
q.drain = function() {
    console.log('all items have been processed');
}

function Count(i) {
    this.count = i;
}

console.log("testing maximum capabilities");
var asyncTest = function() {
    for(var i = 0; i < 100; i++) {
        var count = new Count(i);
        console.log(count);
        q.push({"name": i}, function (err) {
            console.log("processed:" + this.data.name);
        });
    }
};

asyncTest();