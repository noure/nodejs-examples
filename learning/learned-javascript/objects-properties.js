// properties can be accessed two ways
var text = "purple haze";
console.log(text["length"]);
/* The second way is a shorthand for the first, and it only works when the name 
of the property would be a valid variable name ― when it doesn't have any spaces 
or symbols in it and does not start with a digit character.*/
console.log(text.length);

// object
var cat = {colour: "grey", name: "Spot", size: 46};
cat.size = 47;
console.log(cat.size);
/* The keyword delete cuts off properties. Trying to read a non-existent property 
gives the value undefined.*/
delete cat.size;
console.log(cat.size);
console.log(cat);

/*  If a property that does not yet exist is set with the = operator, it is added 
to the object. */
var empty = {};
empty.notReally = 1000;
console.log(empty.notReally);

/* Properties whose names are not valid variable names have to be quoted when 
creating the object, and approached using brackets. */
var thing = {"gabba gabba": "hey", "5": 10};
console.log(thing["5"]);
thing["5"] = 20;
console.log(thing[2 + 3]);
delete thing["gabba gabba"];

/* As you can see, the part between the brackets can be any expression. 
It is converted to a string to determine the property name it refers to. 
One can even use variables to name properties. */
var propertyName = "length";
var text = "mainline";
console.log(text[propertyName]);

/* The operator in can be used to test whether an object has a certain property. 
It produces a boolean. */
var chineseBox = {};
chineseBox.content = chineseBox;
console.log("content" in chineseBox);
console.log("content" in chineseBox.content);


/* When we have two numbers, 120 and 120, they can for all practical purposes be 
considered the precise same number. With objects, there is a difference between 
having two references to the same object and having two different objects that 
contain the same properties. */
/* object1 and object2 are two variables grasping the same value. There is only one 
actual object, which is why changing object1 also changes the value of object2. 
The variable object3 points to another object, which initially contains the same 
properties as object1, but lives a separate life.

JavaScript's == operator, when comparing objects, will only return true if both
values given to it are the precise same value. Comparing different objects with
identical contents will give false. */

var object1 = {value: 10};
var object2 = object1;
var object3 = {value: 10};

console.log(object1 == object2);
console.log(object1 == object3);

object1.value = 15;
console.log(object2.value);
console.log(object3.value);

// One way to give an object methods is to simply attach function values to it.
var rabbit = {};
rabbit.speak = function(line) {
    console.log("The rabbit says '", line, "'");
};
rabbit.speak("Well, now you're asking me.");
// using this
function speak(line) {
    console.log("The ", this.adjective, " rabbit says '", line, "'");
}
var whiteRabbit = {adjective: "white", speak: speak};
var fatRabbit = {adjective: "fat", speak: speak};

whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!");
fatRabbit.speak("I could sure use a carrot right now.");
// using method.apply(object, arguments); changes "this" context
speak.apply(fatRabbit, ["Yum."]);
// works with call too, does not need an arguments array
speak.call(fatRabbit, "Burp.");

// constructor example, start with capital letter
function Rabbit(adjective) {
    this.adjective = adjective;
    this.speak = function(line) {
        console.log("The ", this.adjective, " rabbit says '", line, "'");
    };
}

var killerRabbit = new Rabbit("killer");
killerRabbit.speak("GRAAAAAAAAAH!");
/* Why is the new keyword even necessary?
   new does a few things behind the scenes. For one thing, our killerRabbit has a
   property called constructor, which points at the Rabbit function that created it. */

// another approach using prototype
function RabbitProto(adjective) {
    this.adjective = adjective;
}
RabbitProto.prototype.speak = function(line) {
    console.log("The ", this.adjective, " rabbit says '", line, "'");
};

var hazelRabbit = new RabbitProto("hazel");
hazelRabbit.speak("Good Frith!");
   