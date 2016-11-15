'use strict';

const arr = [1,2,3];
const newArr = arr.map(val => {
    if (val == 3) {
        return val + 1;
    }
    return val;
});

console.log(newArr);