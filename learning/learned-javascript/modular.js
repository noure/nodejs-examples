/* 
    because this has to work in node.js too, i use the solution
    to bind the function to the node.js global object
    see http://nodejs.org/docs/latest/api/globals.html#global
*/
(function () {
    global.getName = function() {
        return "name";
    }
})();

console.log(getName());