var async = require("async"); // https://github.com/caolan/async

// create a queue object with concurrency 200
var q = async.queue(function (task, callback) {
    function doIt() {
        console.log("working with:" + task.name);
        callback();
    };
    process.nextTick(doIt);
}, 200);

// assign a callback to call when all task are finished
q.drain = function() {
    console.log('all items have been processed');
}

var asyncTest = function() {
    for(var i = 0; i < 10000; i++) {
        q.push({"name": i}, function (err) {
            console.log("processed:" + this.data.name);
        });
    }
};

asyncTest();