var poolModule = require("generic-pool");

function SimpleResource() {
    
}
SimpleResource.prototype.connect = function(callback) {
    console.log("connected");
};


// create pool with priorityRange of 3
// borrowers can specify a priority 0 to 2
var pool = poolModule.Pool({
    name     : 'resource',
    create   : function(callback) {
        // do something
        new SimpleResource().connect(function(err, server) {
            callback(err, this);
        });
    },
    destroy  : function(resource) { 
        // cleanup.  omitted for this example
        resource = null;
    },
    max      : 10,
    idleTimeoutMillis : 30000,
    priorityRange : 3,
    log: false
});

// acquire connection - no priority - will go at end of line
pool.acquire(function(err, resource) {
    pool.release(client);
});

// acquire connection - high priority - will go into front slot
pool.acquire(function(err, resource) {
    pool.release(client);
}, 0);

// acquire connection - medium priority - will go into middle slot
pool.acquire(function(err, resource) {
    pool.release(client);
}, 1);

console.log("testing maximum capabilities");
var asyncTest = function() {
    for(var i = 0; i < 10000; i++) {
        // acquire connection - no priority - will go at end of line
        pool.acquire(function(err, resource) {
            pool.release(client);
        });
    }
};

asyncTest();

