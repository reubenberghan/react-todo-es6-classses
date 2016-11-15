'use strict';

const todos = {
    '123abc': {
        text: 'something'
    },
    '456def': {
        text: 'else'
    }
};

const ids = Object.keys(todos);

console.log(ids);

const todosArr = ids.map(id => {
    return Object.assign({}, { id }, todos[id]);
});

console.log(todosArr);