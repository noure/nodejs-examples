/*
Prototypes are a powerful, if somewhat confusing, part of the way JavaScript 
objects work. Every object is based on a prototype, which gives it a set of
inherent properties. The simple objects we have used so far are based on the
most basic prototype, which is associated with the Object constructor. 
In fact, typing {} is equivalent to typing new Object().
*/
// example "constructor"
function Rabbit(adjective) {
    this.adjective = adjective;
    this.speak = function(line) {
        console.log("The ", this.adjective, " rabbit says '", line, "'");
    };
}
console.log(Rabbit.prototype); // logs {} meaning Object
console.log(Rabbit.prototype.constructor); // shows the function

/* Every function automatically gets a prototype property, whose 
constructor property points back at the function. Because the 
rabbit prototype is itself an object, it is based on the Object 
prototype, and shares its toString method. */
var simpleObject = {};
console.log(simpleObject.constructor);
console.log(simpleObject.toString);

var killerRabbit = new Rabbit("killer");
console.log(killerRabbit.toString == simpleObject.toString);

/* Even though objects seem to share the properties of their prototype, 
this sharing is one-way. The properties of the prototype influence the
object based on it, but the properties of this object never change the prototype.

The precise rules are this: When looking up the value of a property, JavaScript
first looks at the properties that the object itself has. If there is a property 
that has the name we are looking for, that is the value we get. If there is no 
such property, it continues searching the prototype of the object, and then the
prototype of the prototype, and so on. If no property is found, the value undefined
is given. On the other hand, when setting the value of a property, JavaScript never
goes to the prototype, but always sets the property in the object itself.*/
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
console.log(Rabbit.prototype.teeth);

/* Now the whole mess related to approaching objects as plain sets of properties has 
been 'encapsulated' in a convenient interface: one constructor and four methods. 
Note that the values property of a Dictionary object is not part of this interface,
it is an internal detail, and when you are using Dictionary objects you do not need
to directly use it.*/
function forEachIn(object, action) {
    for (var property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property))
            action(property, object[property]);
    }
}
function Dictionary(startValues) {
    this.values = startValues || {};
}
Dictionary.prototype.store = function(name, value) {
    this.values[name] = value;
};
Dictionary.prototype.lookup = function(name) {
    return this.values[name];
};
Dictionary.prototype.contains = function(name) {
    return Object.prototype.hasOwnProperty.call(this.values, name) &&
        Object.prototype.propertyIsEnumerable.call(this.values, name);
};
Dictionary.prototype.each = function(action) {
    forEachIn(this.values, action);
};

var colours = new Dictionary({Grover: "blue",
                              Elmo: "orange",
                              Bert: "yellow"});
console.log(colours.contains("Grover"));
console.log(colours.contains("constructor"));
colours.each(function(name, colour) {
    console.log(name, " is ", colour);
});