# Project #6 - Type Ahead

### _By Eliad Touksher_

## New things learned in this project

- Using the `String.prototype.match()` method to get matching results with a regex value.
- Working with `RegExp` object to filter strings.
- Better understanding the `change` and `keyup` evenets.
- Using `join('')` method on an array to convert it into a string.
- Better understanding of how to work with template HTML in order to get fetched data and to display the data in the UI.
- Sometimes better just ask StackOverflow for quick answers :)

## Intro

In this challenge we will create a type feature that will present us a list of cities and states in the US ,and their population, coming from a JSON file that contains all of that data. We can search for a keyword in the search input field and it will pop up a window that that will display to us all the relevant options based on our query,and highlight the matching words.

## User Stories

If I'll type something like 'new', I should see a list of all the cities and states in the US that contains the word 'new', like 'New York, New York', 'New Orleans, Louisiana' etc. The section of the city or state name that contains 'new' should be highlighted and also I should see the population number, where a series of 3 numbers are seperated by commas.

## Solution map

We should first use an AJAX method to get the data from the cities source and put it into an array, then we could use `filter` to create a search point based on the user's query. Next up, we should input the results into a template HTML so we could append it to the DOM and display it in the UI. Next up we need to some regExp values that will help us to look and to select the words we pass in the search field. Lastly, we will need to write a function that will add the commas between a series of 3 numbers in the population number that is being displayed in the UI.

## Wes` Solution

### Fetching the JSON data

We get our list of cities, states and population from a source that Wes has already provided us: a Github gist that contains an array with a thousand objects, all in JSON format.

```js
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
```

First we will start by creating an empty array that we will input our results of the fetching into.

```js
const cities = [];
```

We will need to fetch this data, and we could do this with a built in browser webAPI function which is `fetch()`. We will pass in the `endpoint` variable into `fetch()` and in turn this will return us a `promise`, and so in order to access it we will also have to use `.then()` against it and pass on a single argument that will hold the result of the `promise`, and that way we will get its data. The first `.then()` data that comes back is still in a form of raw data, and so we can use the `.json()` method against it which is in the prototype of the JSON object in order to convert it into a JSON, thus a readable code.

```js
fetch(endpoint).then(data => data.json());
```

In turn, this will again return a promise that will contain the readable data, and so we will use the `.then()` method again and this time we will be able to see and use the data that comes back from the `fetch()` function.

```js
fetch(endpoint)
  .then(data => data.json())
  .then(data => console.log(data));
```

### Sorting the data into the `cities` array

Loging the data to the console, we can see that now we get a massive array of 1000 elements, and now we could use this data. Now we would like to get this data into our `cities` array. We could use a few methods in order to get the data into the array, like converting the array from `const` to `let` and then assigning the data to `cities`, but if we want (and we should) keep our array `const`, we could use the `push()` array method on the data and push all the data into the `cities` array, but the problem with this is that we're getting an array that holds the array of the data, so a nested array, and to prevent this unnecessary nesting, we could just use the spread operator and spread the `cities` array inside the `push()` method. This way, the data items will be spread out of their original array and input right into our `cities` array.

```js
fetch(endpoint)
  .then(data => data.json())
  .then(data => cities.push(...data));
```

### Filtering the search results

Next up we would like to take the results of the search and filter down the data into a subset where we could get the accurate results, and so we will create a function for it.
The function will take 2 parameters: `wordToMatch`, which will be the query passed by the user, and `cities` which will be the `cities` array that holds the data. Then the function will `return` `cities.filter()` which will return the subset list we're looking for, based on what was searched.

```js
function findMatches(wordsToMatch, cities) {
    return cities.filter(place => {
      // Check if the city or state matches the query value
    });
```

For that we could use the `match()` method that returns a boolean based on matching of strings. Inside the parentheses we would like to pass in a regex value that will look up for the string the user pass as `wordsToMatch` argument, and so we will first create a new `RegExp` value which will contains the `wordsToMatch` as the first argument, and the regex flags of `gi`, to filter global and to be insensitive to match lowercase and uppercase. Then we could use the `.match()` method on both cities OR states and pass in the `regex` variable as the argument.

```js
function findMatches(wordsToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordsToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
```

### Displaying the results

Now that we have our filter, we need to create our display results function named `dipslayMatches`. First we will select both the search field and the suggestions field and put them into variables so we could work with them inside our function.

```js
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
```

Next up we will want to create event listeners for the search field, that will listen to `change` event, so when the input finishes changing to something different, we will run the display function. Also, we would like to add an event listener that listens to `keyup` event, which is every keystroke we make, and so it will call the display function on it instantly, thus making the search mechanic look more dynamic and instant.

```js
searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
```

Now we will build out `displayMatches` function and inside of it will we want to call the `findMatches` function and pass `this.value`, which is the value of what the user passes in the search input filed, as the query and `cities` which is the original data array. We will then pass it into a variable that will hold the filtered array.

```js
function displayMatches() {
  const matchArr = findMatches(this.value, cities);
}
```

Now we would like to loop over `matchArr` with `map()` and `return` an HTML template that will hold the data that comes from the filtered array, and sort it into HTML elements to be displayed on the UI. Because `map()` returns us an array, we would like to convert it into a string, and so we will use `.join('')` in the end to convert the array into string. Lastly, After got the template with the data, we could append the HTML template to `suggestions` using the `innerHTML` property.

```js
function displayMatches() {
  const matchArr = findMatches(this.value, cities);

  const html = matchArr
    .map(place => {
      return `
        <li>
        <span class="name">${place.city}, ${place.city}</span>
        <span class="population">${place.population}</span>
        </li>
        `;
    })
    .join("");
  suggestions.innerHTML = html;
}
```

### Highlighting the searched strings

One of the last touches to this challenge would be to highlight the passed search query in the result in the city and state as well, so if we pass 'los' in the search field the 'Los' of 'Los Angeles' will get highlighted. What we will do is before we `return` the HTML template in the `displayMatches` function, we will create a regex that will replace the searched query matches with a `<span class="hl">` and the word that it matches. Then we will take the city and state variables that hold the replaced values and replace them in the HTML template with the default `place.city` and `place.state`.

```js
function displayMatches() {
    const matchArr = findMatches(this.value, cities);

    const html = matchArr.map(place => {

        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

        return `
        <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${place.population}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
```

### Formating the numbers on the population number

Last touch will be to format the numbers on the population figure to have commas between 3 numbers (i.e, 1000000 -> 1,000,000). There are multiple ways to approach this, but for simplicity sake we will just use an already set function from StackOverflow.

```js
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
```

Then we will simply call this function om the population value in the HTML template.

```js
`
<span class="population">${numberWithCommas(place.population)}</span>
`;
```

### Complete code

```js
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
  .then(data => data.json())
  .then(data => cities.push(...data));

function findMatches(wordsToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordsToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArr = findMatches(this.value, cities);

  const html = matchArr
    .map(place => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      return `
        <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    })
    .join("");
  suggestions.innerHTML = html;
}

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
```
