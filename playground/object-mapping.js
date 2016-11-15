'use strict';

const obj1 = { name: 'Reuben', job: 'BA' };
const obj2 = { job: 'Developer', industry: 'IT' };

const obj3 = Object.assign({}, obj1, {});

console.log(obj1);
console.log(obj3);