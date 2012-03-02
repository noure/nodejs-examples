/*
    Example for a non blocking loop, where order of processing is preserved.
*/
function doSomething(entry) {
    console.log(entry);
};

function done(msg) {
    console.log(msg);
}

function processEntryWhereOrderMatters(entries, index) {
    index = index || 0;
    if (index === entries.length) return done("ordered");

    doSomething(entries[index]);

    process.nextTick(function() {
        processEntryWhereOrderMatters(entries, ++index);
    });
};

processEntryWhereOrderMatters(["1","2","3"]);

/*
    Example for a non blocking loop, where order does not matter
*/

function processEntryWithoutOrder(entries) {
    var leftToProcess = entries.length;

    for(var i = 0; i < entries.length; i++) {
        (function(entry) {
            process.nextTick(function() {
                doSomething(entry);
                if (--leftToProcess === 0) {
                    done("unordered");
                }
            });            
        })(entries[i]);
    };
};

processEntryWithoutOrder(["foo","bar","foobar"]);