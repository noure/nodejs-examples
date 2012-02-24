// nodeunit test https://github.com/caolan/nodeunit
// run with nodeunit test nodeunit-example.js
exports.testSomething = function(test){
    test.expect(1);
    test.ok(true, "this assertion should pass");
    test.done();
};