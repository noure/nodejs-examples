/* What forEach does is take an algorithm, in this case 'going over an array', 
and abstract it. 
The 'gaps' in the algorithm, in this case, what to do for each
of these elements, are filled by functions which are passed to the algorithm function.*/
function forEach(array, func) {
    for (var i = 0; i < array.length; i++)
        func(array[i]);
}
forEach(["Wampeter", "Foma", "Granfalloon"], console.log);

// using it as anonymous inner function
function sum(numbers) {
    var total = 0;
    forEach(numbers, function (number) {
        total += number;
    });
    return total;
}
console.log(sum([1, 10, 100]));