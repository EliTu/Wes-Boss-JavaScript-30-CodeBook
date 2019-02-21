# Project #4 - Array Cardio Day 1

### _By Eliad Touksher_

## New things learned in this project

\*

## Intro

In this project we will be getting dirty with arrays and array methods - `filer()`, `map()`, `sort()`, `reduce()` and more. The idea is to practice and utilize these array methods as much as possible to get better at using them, thus improving our fundamental JavaScript knowledge in the basics and essentials parts of the language.

We will be working with an array of objects of "inventors" which holds data that is sorted by key-value pairs, i.e:

```js
const inventors = [{
        first: 'Albert',
        last: 'Einstein',
        year: 1879,
        passed: 1955
      },
      ....
```

and an array named "people" which only includes a first name and last name held together inside a single string, but are separated by a coma and a space, i,e:

```js
const people = ['Beck, Glenn', 'Becker, Carl',...]
```

In addition, we will be looking at a wikipedia page to get some elements from the DOM and then use array methods on them.

### Exercise #1 - Array.prototype.filter()

#### objective

The first exercise will have us to use the `.filter()` method, and we will need to get a list of all the inventors who were born in the 16th century(1500's).

#### Solution

The `.filter()` method works in the way that it takes an array , and by using a function and a 'single item' argument, its going to loop over every item in the array and give us a new array of the looped items, based on how we want to keep them (or not).

So in this case, we will need to determine that we want to get back a new array containing only elements which their `.year` value is corresponding to the objective. And so we can utilize an 'if' statement inside the function to achieve that.

```js
const fifteen = inventors.filter(inventor => {
  if (inventor.year >= 1500 && inventor.year <= 1599) return true; // If true, Keep the array element.
});
console.table(fifteen);
```

After we log the results to the console we can see that we get an array of 2 elements in the index list, corresponding to the 'if' statement logic.

`return true` basically allows us to keep the element if it is within the logic of the 'if' statement. Also, we do not need to have any 'else' statement here of `return false` since if the result is `!true` it will simply ignore and wont return that element.

Using the ES6 syntax, we can reduce the code we have here in the array function to make it more concise and readable. We can remove the parentheses around `inventor`, remove the curly braces and the 'if' statement declaration, and the `return` keyword itself and basically return the condition itself, which is a boolean, if it's true then it will `return true` without needing to implicitly specify it.

```js
const fifteen = inventors.filter(
  inventor => inventor.year >= 1500 && inventor.year <= 1599
);
console.table(fifteen);
```

### Exercise #2 - Array.prototype.map()

#### objective

In this exercise we will need to get an array of the inventors that contains their first and last names.

#### Solution

The method `.map()` takes an array, does a specific action with that array and then returns a new array of the same length. In comparison with `.filter()`, The `.map()` will always result in a new array of the same length as passed into it, while `.filter()` method will produce a new array containing the items that passed though the filtering process.

As with the `.filter()` method, `.map()` loops over the given array and with a function that takes a single argument that will represent each element in the array, and then returns the new result. The objective is to get the first and last name of each of the inventors, and so we will loop over the inventors and return the values of `inventor.first` and `inventor.last`, this will create a new array that contains only these values as a single string.

```js
const firstLast = inventors.map(
  inventor => `${inventor.first} ${inventor.last}`
);

console.table(firstLast);
```

### Exercise #3 - Array.prototype.sort()

#### objective

In here our objective will be to sort all the inventors according to their birth dates, from the oldest to the youngest.

#### Solution

`.sort()` method works by looping over the given array, and by taking 2 items as arguments which represent the elements in the array, sort these 2 items according to our specifications we provide in the function. These 2 items can be named however we like (As far as I know, the convention is 'a' and 'b') and then in the function we compare between the two by assigning them a 'high' and 'low' numeric values (Usually '1' and '-1'), and eventually return a new array with all the array items sorted according to the arrangement done by sorting the numeric values, which item has a higher value and which item has a lower value.

Inside the function code block we will use an 'if' statement to determine which `year` key value is greater between the 2 items, and then sort them up and down inside a new array. The result is a new array with the birth years sorted from the "oldest" to the "youngest".

```js
const sortAges = inventors.sort((a, b) => {
  if (a.year > b.year) {
    return 1; //
  } else {
    return -1;
  }
});
console.table(sortAges);
```

Once again, we can use the ES6 syntax to make the function much smaller by having less lines of code, and thus more readable. We can use the Ternary Operator to make a "one line 'if' statement" that returns the result immediately.

```js
const sortAges = inventors.sort((a, b) => (a.year > b.year ? 1 : -1));
console.table(sortAges);
```

### Exercise #4 - Array.prototype.reduce()

#### objective

#### Solution

### Exercise #5 - Mixed exercise

#### objective

#### Solution

### Exercise #6 - Array.prototype.sort() exercise

#### objective

#### Solution

### Exercise #7 - Array.prototype.reduce() exercise

#### objective

#### Solution
