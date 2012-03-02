var async = require("async"); // https://github.com/caolan/async

// create a queue object with concurrency 2

var q = async.queue(function (task, callback) {
    console.log('hello ' + task.name);
    callback();
}, 2);


// assign a callback
q.drain = function() {
    console.log('all items have been processed');
}

// add some items to the queue

q.push({name: 'foo'}, function (err) {
    console.log('finished processing foo');
});
q.push({name: 'bar'}, function (err) {
    console.log('finished processing bar');
});

// add some items to the queue (batch-wise)

q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function (err) {
    console.log('finished processing bar');
});


console.log("testing maximum capabilities");
var asyncTest = function() {
    for(var i = 0; i < 10000; i++) {
        q.push({"counter": i}, function (err) {
            console.log('finished processing:' + i);
        });
    }
};

asyncTest();