// simple example
function lastElement(array) {
    if (array.length > 0)
        return array[array.length - 1];
    else
        throw "Can not take the last element of an empty array.";
}

function lastElementPlusTen(array) {
    return lastElement(array) + 10;
}

try {
    console.log(lastElementPlusTen([]));
}
catch (error) {
    console.log("Something went wrong: ", error);
}


// working with the error object
try {
    console.log(Sasquatch);
}
catch (error) {
    console.log("Caught: " + error.message);
}

// creating an error
try {
    throw new Error("Fire!")
}
catch (error) {
    console.log("Caught: " + error.message);
}