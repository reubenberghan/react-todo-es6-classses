'use strict';

// function add (a, b) {
//     return a + b;
// }

// console.log(add(3, 1));

// var toAdd = [9, 5];
// console.log(add(...toAdd));

// var groupA = ['Jen', 'Cory'];
// var groupB = ['Vikram'];
// var final = [...groupB, 3, ...groupA];

// console.log(final);

var person = ['Reuben', 30];
var personTwo = ['Kaiya', 27];

// Hi Reuben, you are 25
function greeting (name, age) {
    console.log(`Hi ${ name }, you are ${ age }`);
}
greeting(...person);
greeting(...personTwo);

var names = ['Mike', 'Ben'];
var final = ['Reuben', ...names];

// Hi Reuben
function greetingLoop (names) {
    names.forEach(name => {
        console.log('Hi', name);
    });
}
greetingLoop(final);