// real simple sum function
function add(a, b) {
  return a + b;
}
console.log(add(2, 2));

// function as variable
var addFunctionObject = function(a, b) {
  return a + b;
};
console.log(addFunctionObject(5, 5));

// using lexical scoping and clojures
function makeAddFunction(amount) {
  function add(number) {
    return number + amount;
  }
  return add;
}

var addTwo = makeAddFunction(2);
var addFive = makeAddFunction(5);
console.log(addTwo(1) + addFive(1));
/*
To wrap your head around this, you should consider functions to not just package up 
a computation, but also an environment. Top-level functions simply execute in the 
top-level environment, that much is obvious. But a function defined inside another 
function retains access to the environment that existed in that function at the 
point when it was defined.

Thus, the add function in the above example, which is created when makeAddFunction 
is called, captures an environment in which amount has a certain value. It packages 
this environment, together with the computation return number + amount, into a value,
which is then returned from the outer function.

When this returned function (addTwo or addFive) is called, a new environment―-in which 
the variable number has a value―-is created, as a sub-environment of the captured 
environment (in which amount has a value). These two values are then added, and the
result is returned
*/

// recursive function
function power(base, exponent) {
  if (exponent == 0)
    return 1;
  else
    return base * power(base, exponent - 1);
}
console.log(power(2,10));

/*
    anonymous function
    What you are doing when you call (function(){}) is returning a function object.
    When you append () to it, it is invoked and anything in the body is executed.    
*/
(function(msg) { 
    console.log(msg); 
})('anonymous function, called right after declaration');