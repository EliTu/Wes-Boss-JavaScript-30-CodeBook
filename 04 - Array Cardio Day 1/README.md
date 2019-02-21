# Project #4 - Array Cardio Day 1

### _By Eliad Touksher_

## New things learned in this project

- `Array.prototype.filter()` - Takes the given array and produce a new array of the items that have been filtered out.
- `Array.prototype.map()` - Takes the given array and produces a new copy of that same array with the same length, but with the specifications we will pass in the function.
- `Array.prototype.sort()` - Takes the given array, sorts the elements based on our specifications by comparing every adjacent element and then sorting them into a new array.
- `Array.prototype.reduce()` - Takes the given array and reduce it to a single value that we will specify after the function.
- Inside of a `.filter()` method, returning a whole logical declaration as a boolean to filter elements.
- `.querySelectAll()` method allows us to select any item in the DOM , and not only the `document` object.
- There are 2 ways to convert a node list into an array: First, by using the `Array.from()` method on a node list variable. Second, by wrapping the variable in brackets and using the spread operator('...') to spread the elements.
- `Array.prototype.includes()` array method that allows us to determine if an array includes a certain value, returns a boolean.
- `String.protoype.split()` string method splits a string into an array of strings at a specific splitting point we specify.

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

#### Objective

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

#### Objective

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

#### Objective

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

#### Objective

In this exercise we will need to get a number that is the sum of all the years that all the inventors have lived. We can use `.reduce()` to achieve that.

#### Solution

The `.reduce()` method allows us to loop over the elements in the array and by executing a function, reduce the array to a single value. The function will take 2 arguments, one is 'total' which we will yield the result and be returned, and the second is the elements of the array. This is basically a cleaner and easier substitute for looping over an array using a 'for' loop and performing an arithmetical operation on the `[i[` variable.

In our case, we would pass a `total` and `inventor` as the argument for the elements in the array. We will `return` the `total` and on every loop iteration we will add the number of years that the inventor lived, which is calculated from `inventor.passed - inventor.year`.

The problem is that upon the first iteration, `total` has no value and so the result will be `undefined`. And so to solve that, the last addition to this function would be add a '0' at the end after the function, and that will set the initial `total` sum to '0', and thus produce a valid result.

```js
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);

console.log(totalYears); // Returns the total amount of years all the inventors lived.
```

### Exercise #5 - Array.prototype.sort() exercise

#### Objective

In this exercise we will use `.sort()` again to sort the inventors based on the amount of years each has lived, from the most years to the least.

#### Solution

We will again use `.sort()` to sort the array and pass in 'a' and 'b' as arguments for the function. But before we will compare them with the high and low numeric values, we will create 2 more variables that will determine how many years the 'a' element and 'b' element have lived, by calculating `a.passed - a.year` (and same thing for 'b'). From that we will compare these 2 variables, between the 'a' elements and the 'b' elements and sort them by returning the result.

```js
const sortYears = inventors.sort((a, b) => {
  const lastYears = a.passed - a.year;
  const firstYears = b.passed - b.year;
  return lastYears > firstYears ? 1 : -1;
});
console.table(sortYears); // Returns the array elements sorted by the amount of years each inventor lived.
```

### Exercise #6 - Mixed exercise

#### Objective

In this exercise we would need to create a list of all the boulevards in Paris that contains the word "de" inside of them. To get the information, we can visit the Wikipedia page that has a [list of the boulevards of Paris](https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris), and since the list is available there only, we will also need to perform this task in the dev tools in that same page.

#### Solution

We will go to the Wikipedia page and we will need to have access to the DOM elements of the list of boulevards in that page. We will look at the dev tools and inspect the elements of the page, find the `class` of the relevant container and use `querySelector()` to select these elements, and we store them into a variable named `category`.

Next we will extract a node list of the links within that container, these links are the clickable links that hold the names of the boulevards, and so this time we will use `querySelectorAll()` on the `category` variable(We can use `querySelectorAll` on any existing element in the DOM, not only on the `document` object), store it in a variable named `links`, and this will produce a new node list containing all of the `a` elements of that container.

At this point, the problem is that we cannot use the array method of `filter()` on a node list, and so we will need to convert the node list into an array first. We can do it in 2 different ways:

- Use the Array object method of `Array.from()` and wrap the whole variable value inside of the parentheses, which will convert it into an array.
- Wrap the variable inside brackets `[]` and use the spread operator `...` to spread each item into the array.

Now that the `links` variable is an array we can use the array methods on it. We will first want to use `.map()` to produce a new array that contains just the names of the links as a string, and so we can use the `.textContent` property, and then immediately use `.filter()` to filer out the names with `.includes()` method that checks for specific values inside the array, and by including the words "de" in the parentheses, and so creating a new array of all the elements that has "de" in their names.

```js
const category = document.querySelector(".mw-category"); // Get the category list from the dev tools.
const links = Array.from(category.querySelectorAll("a")); // Transform them from a node list into an array.
const de = links
  .map(link => link.textContent)
  .filter(streetName => streetName.includes("de")); // First map the links and then filter them.
```

### Exercise #7 - Array.prototype.sort() exercise

#### Objective

Now we going to focus on the `people` array and we need to sort them elements in the array alphabetically. Compared to the `inventors` array, this time we don't have a well sorted list of objects with comfortable key-value pairs, but we have sets of strings of first and last names, only separated by a coma and a space (, ).

#### Solution

In order for us to use the `.sort()` method successfully to sort the last names, we will first have to separate the last names and make an array of them. For that we can use the `.split()` method to split an array element at a certain point into 2 different elements, and inside the parentheses we can pass the split point, so for us to get the last name, the best way will be to split at the (, ) part. Now we get an array of many arrays where the position 0 index element is the last name, and the position 1 index is the first name. We will then do the same for the 'next' argument as well.

We could destructor this again in order to turn the `people` array into one big array with proper variables that we can sort, and so we will put both of the variable names inside brackets [] and then we can compare the value of the 'last' and sort it numerically to get the desired result.

```js
const alphabet = people.sort((last, next) => {
  const [aLast, aFirst] = last.split(", ");
  const [bLast, bFirst] = next.split(", ");
  return aLast > bLast ? 1 : -1; // Comparing the last name arrays and sorting.
});
console.table(alphabet);
```

### Exercise #8 - Array.prototype.reduce() exercise

#### Objective

In the last exercise we will use `.reduce()` method in order to reduce the instances of the `data` array into one object that will hold the data.

#### Solution

Inside the `.reduce()` function we will pass `total` and `item`, but we will need to start with an empty object that will count all instances from 0, and we will start with a blank object ({}) after the end of the function, and we will code the 0 sum ourselves.

What we would eventually like to do is to get the `item` incremented by 1 on every occurrence by performing `total[item]++`, but since we don't know if a specific key exists we will need to check for it, and if it doesn't we will give it a value of 0. At the end we `return` the total.

The result is an object that returns the amount of times the item is occurring in the array, if there is no such item in the array then we will produce an entry for him by giving it the initial value of 0 and then checking again, and in this way we can actually insert more elements in the `data` array and new instances will be added and calculated automatically.

```js
const transportation = data.reduce((total, item) => {
  if (!total[item]) {
    total[item] = 0;
  }
  total[item]++;
  return total;
}, {});

console.log(transportation);
```
