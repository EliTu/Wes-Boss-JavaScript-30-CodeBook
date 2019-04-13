# Project #7  - Array Cardio Day 2

### _By Eliad Touksher_

## New things learned in this project

## Intro

In this challenge we will again be looking at some useful array methods and how they can be used in our code. The array methods we will be focusing this time are `some()`, `every()`, `find()` and `findIndex()`.

## User Stories

---

## Solution map

Just use the various array methods to solve the mini-challenges :)

## My Solutions

```js
const people = [{
        name: 'Wes',
        year: 1988
    },
    {
        name: 'Kait',
        year: 1986
    },
    {
        name: 'Irv',
        year: 1970
    },
    {
        name: 'Lux',
        year: 2015
    }
];

const comments = [{
        text: 'Love this!',
        id: 523423
    },
    {
        text: 'Super good',
        id: 823423
    },
    {
        text: 'You are the best',
        id: 2039842
    },
    {
        text: 'Ramen is my fav food ever',
        id: 123523
    },
    {
        text: 'Nice Nice Nice!',
        id: 542328
    }
];
// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?

const areSomeAdults = people.some(person => (new Date().getFullYear()) - person.year >= 19);

console.log(areSomeAdults); // True

// Array.prototype.every() // is everyone 19 or older?

const areAllAdults = people.every(person => (new Date().getFullYear() - person.year >= 19));

console.log(areAllAdults); // False

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423

const findCommentById = comments.find(comment => comment.id === 823423);

console.log(findCommentById); // Comment #2

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423

const deleteCommentByIndex = comments.findIndex(comment => comment.id === 823423);
console.log(deleteCommentByIndex); // 1

comments.splice(deleteCommentByIndex, 1);
console.log(comments); // [0, 2, 3, 4]
```

### Wes' Solutions

### Array.prototype.some()

This array method would check if at least one array element meets the requirements we pass in the code block. We need to pass a conditional statement and expect a boolean, if the condition will be `true`, the function will `return` the elements that stand in the conditions we've set.

In our example, we would like to check if at least one array element is over the age of 19, and so we will pass that logic into a `some()` method that runs against the `people` array. When we `console.log` the `isAdult` variable, we receive `true`, as there are elements in the array that satisfy the `if` condition.

```js
const isAdult = people.some((person) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - person.year;
    if (age > 19) return true;
});

console.log(isAdult); // True
```

**Small tip from Wes**: We could wrap the console log argument with curly braces, and that would `return` us an object that contains the result of the console log, for better readability.

```js
console.log({isAdult});
```

Looking at this function, we could simplify it more and actually make it all in One line, using the full potential of the ES6 arrow functions.

```js
const isAdult = people.some(person => (new Date().getFullYear()) - person.age >= 19);

console.log(isAdult); // true.
```

### Array.prototype.every()

This array method checks if all of the array elements satisfy the condition we will set inside the array method code block. Will expect a conditional expression and will `return` a boolean.

In our example we would check the same array and see if all the elements are above the age of 19.

```js
const areAllAdults = people.every(person => (new Date().getFullYear() - person.year >= 19));

console.log(areAllAdults); // false.
```

The `console.log` will print back `false`, meaning that at least one of the array elements does not satisfy the condition we set.

### Array.prototype.find()

This array method is a bit similar to `filter()`, only instead of returning a subset of the array we pass the method against, it will return us the first element that pass the conditions that are set in the code block. This array method once again will expect a conditional expression and will `return` a boolean.

In our example, we would like to look into the `comments` array and find the comment with the `id` of 823423. We would simply pass a conditional check using the `===` operator.

```js
const comment = comments.find(comment => comment.id === 823423);

console.log(comment); // Comment #2
```

### Array.prototype.findIndex()

This array method looks for array element that satisfies our condition and `return` its index inside the array. This too will expect a conditional expression and will `return` a boolean.

In our example, we would like to find the comment with the `id` of 823423, and then remove it from the array, based on its index. We will use `findIndex()` in order to find the index of that array element first. Like before, we could use the `===` operator to check for the condition.

```js
const index = comments.findIndex(comment => comment.id === 823423);

console.log(index); // 1
```

Now we will need to delete the array element that is in the position that is stored in the `index` variable. We could do that in 2 ways: The first, we could use the `splice()` method, and pass `index` as the index location, which in turn will mutate the original array by deleting the specified element.

```js
comments.splice(index, 1);
console.log(comments); // [0, 2 ,3 ,4]
```

The second way is the "Redux" way of doing it: create a new array of the updated comments, that does not contain the element we want to delete. In this way, we create a variable that holds a new array, inside of it we use the spread operator to spread the old array twice with a `slice()` method to copy the old array: one copy of the with elements at the position of 0 up to the index of the `index` element, and another one that starts from the position of the `index` element + 1, and it will go until the end. In turn, it will create a new array that contains the items of the old array, without the element we want to exclude.

```js
const newComments = [
    ...comments.slice(0, index),
    ...comments.slice(index + 1)
];
console.table(newComments); // [0 , 2 ,3 ,4]
```