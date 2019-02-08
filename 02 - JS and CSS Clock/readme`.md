# Project #2 - CSS + JS Clock
### *By Eliad Touksher*

## New things learned in this project:
* Setting `transform-origin` to change the starting position of the transformation animation of the object on the axis.
* Setting `transform: rotate()` to make rotation animations, according to `deg` values in the parentheses. 
* Using `new Date()` for getting the current date (and time). 
* Using `(date value).getSeconds/Minutes/Hours()` method to get the specific time values from the `Date()` function.
* Using `setInterval()` method with a specific affected value and time interval (in milliseconds) inside the parentheses for performing a task in a set interval.
The concept of converting specific values, like time values, to other values, like degrees by using math logic, and applying it for CSS usable values.

## Intro:
In this project we will build a clock made of CSS and functions with JavaScript. It takes in the current time using JS and rotates the hour, minute and second handles accordingly. 

## User Stories:
I can see that the handles are of the clock are dynamically positioned according to the time of my current location. 
The handles are moving and updating dynamically. 

## Solution map:
Make a `date()` method to get the current date.
Make the handles interact with the `date()` values.
Make the handles move on the X axis in an angle using CSS transform, according the value of the `date()` method. 

## Wess` Solution:

First we will need to perform some additional changes and additions in our CSS file to the `<div>` with the class of “hand”. By default, the handles are all stacked on each other and point to “9 o`clock”. In order to make them dynamically move we will need to give them CSS transform effects. 

CSS transform - The problem we gonna have if we will just add `transform: rotate(20deg)` is that by default the handle gonna rotate from the middle of the axis, and not from the edge like we would like a clock handle to do, from the very right-hand side. We will need to fix that by applying `transform-origin` property to our 'hand' class, and change it to 100%, and that will allow it to rotate on the X axis from it's edge. The default is 50%, what makes it spin from it`s middle.

````CSS
transform-origin: 100%;
````

Another problem - Because `<div>` elements are blocks, they go from left to right by default, and that is the reason the clock handles are all lying horizontally on the X axis, all “pointing” at “9 o'clock”. To fix that we can give the `<div>` elements a default rotate value of 90 degrees to align them vertically with the Y axis, making them face “12 o`clock” as their default position.

````CSS
transform: rotate(90deg);
````

Applying transitions - Now that all the handles are positioned we can give them CSS transitions rules that will allow them to dynamically move when the clock is “ticking". We will also set the `transition-timing-function` to give it a smoother effect.

````CSS
transition: all 0.005s;
transition-timing-function: ease-in-out;
````

Getting the date stats - Now we can move on to write the JavaScript for the clock to make everything dynamic and moving. The first thing we will need to do is to get our current time values. We start by writing a function of `setDate()` which inside of it we will set all the date values functionality.

````javascript
function setDate() {

}
````

Next, we will need it to run itself every second, like a real clock, and so we will add another `setInterval()` function, with `setDate` as a callback argument, and the value of `1000` (milliseconds = 1 second). Now we can do a check by console.log something, like `hi`, and we can see that the console prints `hi` every second.

````javascript
	function setDate() {

}
setInterval(setDate, 1000);
````

Now we can get the date values and apply them to variables that we could reuse later on. First we will get the current date by using the `new Data()` function, attached to a variable that will hold the value of the current date.

````javascript
const now = new Date();
````

We don't need the whole date stats like the current year, month etc, we just need the hours, minutes and seconds, and so we will get each one individually. We will attach them all to variables, we will start the seconds, as this will be the most dynamic time value and will apply the most change for the seconds handle. We will use the `getSeconds()` method on the 'now' variable, in order to access the data, and store the value in a variable. This gives us access to the seconds of the current minute, it goes up to 60 and then restarts to 0. 

````javascript
const now = new Date();
   const seconds = now.getSeconds();
````

Converting the time value to angle degree - Now we will need to use these second values in order to move the handle around, which means we will need to convert it to degrees which will correspond to the `transform` values of the `second-hand` class. First, we will need to convert it into a 0 based value, meaning that 0 seconds = 0 degrees, 60 seconds (100%) = 360 degrees etc, this will allow us to have an accurate rotation of the handle according to the values of the seconds. We will create a new variable named `secondsDegrees` and we will perform a small math calculation that will fix the values with the degrees. This little calculation means that if we have 60 seconds, we will divide it by 60, which will be 1, and multiply by 360 which will give us 360, this means  that 60 seconds = 360, and then we can convert it to degrees that will affect the rotation of the handle (which will be applied each second thanks to the setInterval() function).

````javascript
    const secondsDegrees = ((seconds / 60) * 360);
````

Selecting the `seconds-hand` - We will select it and place it inside a global variable outside the function. Later we can use that variable to manipulate the DOM according to the seconds value.

````javascript
const secondHand = document.querySelector('.second-hand');
````

Now we can apply styles to it. We would like to give it `transform: rotate()` values, while the degrees value is exactly the `secondsDegrees` value, which is the degrees according to the seconds. 

````javascript
secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
````

Fixing the handle position to correspond the seconds - The transform is working and the handle is moving each second clockwise, but the problem is that its actual location does not correspond to the actual value of the seconds (the console shows 20 seconds, but on the clock, the handle is at 40 seconds). This happens because we initially offset the position of the handle by 90 degrees, and so it won't show the actual location of the handle. We will need to offset it back by going back to our `secondsDegrees` value and adding 90 to the end of the calculation. Now this sets the handle in the right position. 

````javascript
    const secondsDegrees = ((seconds / 60) * 360) + 90;
````

Applying the rest of the stats - Now we will do the exact same thing with the minutes and hours. The only different value we will need to pay attention to is the divide amount we put in the `hoursDegree` calculation, as hours are not `60` based but `12` based.

````javascript
const minutes = now.getMinutes();
const hours = now.getHours();

const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

const minutesDegrees = ((minutes / 60) * 360) + 90;
minHand.style.transform = `rotate(${minutesDegrees}deg)`;

const hoursDegrees = ((hours / 12) * 360) + 90;
hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
````

At this point our clock is fully functional and working according to the hours, minutes and seconds. 

Additional - I personally wanted to add extra animations. First, when the clock second handle gets to a full rotation (90 deg) the clock scales and changes the border color. Also, Removes the transition animation from the `<div>` so it won`t make the weird rollback animation bug upon hitting a full rotation.

````javascript
if (secondsDegrees === 90) {
      handStyle.transition = 'none';
      clockBodyStyle.transform = 'scale(1.15)';
      clockBodyStyle.borderColor = 'dodgerblue';
} else {
       handStyle.transition = 'all 0.005s'
       clockBodyStyle.transform = 'none';
       clockBodyStyle.borderColor = 'white';
}
````

## Full code:

````javascript
const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

const clockBodyStyle = document.querySelector('.clock').style;
const handStyle = document.querySelector('.hand').style;

function setDate() {
   const now = new Date();
   const seconds = now.getSeconds();
   const minutes = now.getMinutes();
   const hours = now.getHours();

   const secondsDegrees = ((seconds / 60) * 360) + 90;
   secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

   const minutesDegrees = ((minutes / 60) * 360) + 90;
   minHand.style.transform = `rotate(${minutesDegrees}deg)`;

   const hoursDegrees = ((hours / 12) * 360) + 90;
   hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  
   if (secondsDegrees === 90) {
      handStyle.transition = 'none';
      clockBodyStyle.transform = 'scale(1.15)';
      clockBodyStyle.borderColor = 'dodgerblue';
   } else {
       handStyle.transition = 'all 0.005s'
       clockBodyStyle.transform = 'none';
       clockBodyStyle.borderColor = 'white';
   }
}
setInterval(setDate, 1000);
````
