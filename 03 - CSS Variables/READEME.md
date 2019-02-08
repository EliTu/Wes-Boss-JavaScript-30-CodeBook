# Project #3 - Playing with CSS variables and JS
### *By Eliad Touksher*

## New things learned in this project:
* Declaring and assigning CSS variables in the document `root` selector. 
* `querySelectorAll` is creating a Node List object, which looks like an array but does not have the full list of the array methods.
Event listener that listens to `mousemove` event, for dynamic changes in the location of the mouse over the selected element. 
* `dataset` object which has access to the `data-*` attribute of a specific HTML element. 
* `setProperty()` method that changes the property of a selected element. 
* CSS variables can be scoped inside specific elements, which will override other more general specifications.

## Intro: 
In this project we will be looking at CSS variables, what are they and what they do, and eventually use JavaScript to change them. We will do that by changing values that affect the image on the page. Whenever we slide the slider, the value of the slider changes dynamically and its said effect will be applied on the image, the color selector will also affect the 'JS' in the title. 

## User stories:
I should see 3 different changeable properties displayed on the page: Spacing, which changes the margin of the picture, Blur, which changes the blur effect of the picture, and Base Color which changes the color of the background of the picture and also that of the `JS` in the headline. 
When I move the slider of the `spacing`, `blur` or change `base color`, I should see the effect taking place immediately on the picture.
I should be able to use them all together to get a combined effect. 

## Solution map:
We should create CSS variables which will set the initial values of the changeable properties. 
Create event handlers for the input fields that will listen to changes upon the sliders and the color change menu.
Assign the the CSS variables as the values of the changeable properties.
Upon changing the values by sliding the slider, change the values of the CSS variables. 

## Wes` Solution:

Setting our CSS variables - We declare them on some sort of `element` as a selector for the properties and values. In our case, and most cases, to define global CSS variables, we use the `:root` selector, which is the highest level of global selector we can use, same as using `html` basically. Within the selector we can set the variables themselves. The syntax is `--variable-name: value;`. And so we will create variables for `spacing`, `blur` and `color-select`, with starting values. 

````CSS
:root {
     --base: #ffc600;
     --spacing: 10px;
     --blur: 10px;
   }
````

Using the variables - After we set our variables we can start using them on the elements in the HTML pages. We will give our `<img>` tag the `--spacing` variable values, the `--blur` variable values and the `--base` variable values. To declare a CSS variable we use the following syntax: `var(--variable-name);`. Now if we open the console and look at the `img` tag, we can see that the padding is actually 10px, background is `#ffc600` and the `filter:blur()` is 10px.

````CSS
img {
     padding: var(--spacing);
     background: var(--base);
     filter: blur(var(--blur));
   }
````

 Same thing we do with the `<h1>` tag, so it can also have the same value of the `--base` variable, that way whenever we change the `--base` value it will change both in the 'img' tag as well as at the 'h1' tag.

````CSS
.hl {
     color: var(--base);
   }
````

Working with the JavaScript - First thing we need to do is to select all 3 inputs we have on the page, i.e 'spacing' slider, 'blur' slider and 'base color' color selector. This will allow us to later sync the selectors with the CSS variables, so when the selector values change, so does the CSS variables values will change. We will do this the standard way we select elements in the DOM, but this time we will use `querySelectorAll` for all the input tags under the `controls` class `<div>`.

````js
const inputs = document.querySelectorAll(`.controls input`);
````

`querySelectorAll` does not really gives us an array, but something called Node List, which is another type of object, if we look at the `inputs` variable in the console, we could actually see it looks just like an array, but looking at its `_proto_` property, we can see it has fewer methods than an array object. One of the things we could do with the Node List object is the `forEach()` method, in order to loop over it, and so we do not have to convert it into an array to use the `forEach()` method.

Setting an event listener and update function - Next we will create a function that will handle changes in the values of the inputs.

````js
function handleUpdate() {

}
````

But before we will set the functionality itself, we want to create an event-listener that will listen to changes in the input fields, for that we will want to loop over the `inputs` variable, and so we will loop over each input and attach an event-listener to it. We want to listen to the `change` event, which basically means any change in the current state of whatever we selected, in our case, change in the values of the input tags. The function will be the `handleUpdate` function we`ve declared earlier.

````js
inputs.forEach(input => input.addEventListener(`change`,		 	handleUpdate));
````

To test this, we will add `console.log(this.value)` inside the `handleUpdate` function. Now when we move the sliders on the page we can see that the value does change and being loged to the console, but the problem is that the values are not being dynamically changed as we drag the sliders, only at the end of the slide, and we want to make it change dynamically as we slide. To solve this, we will create another event-listener for the looped `inputs` variable, but this time we will also listen to the `mousemove`, meaning when ever the mouse moves the slider, the value will be changed dynamically.

````js
inputs.forEach(input => input.addEventListener(`mousemove`		, 	handleUpdate));
````

Attaching the JavaScript to the CSS variables - The first thing we will need to know is what the `suffix` of the value that we're working with. The `--base` variable does not have a unit suffix(px, em, rem, vh etc..), it's just a hex-code basically, but we can see that the `--spacing` and `--blur` variables do have `px` suffix, and so we can use that in conjunction with JavaScript to change the variable values. In order for us to achieve this , there is additional info attached to the `<input>` tag. In the attributes, we can see the `data-*` attribute, which is set to `data-sizing`, with the value of 'px', which we can use in conjunction with the CSS unit of 'px'. Using this we can start setting the `handleUpdate` function. We would want to create a new variable named `suffix` and assign `this.dataset` object to it.

````js
const suffix = this.dataset.sizing;
````

Explaining the `dataset` object - dataset is an object that will contain all the `data-*` attributes from that specific element. in our case the, because we set a variable with `dataset` object inside a function that is attached to an event-listener which listens to changes in values of the `input` tags, we get the value of `data-sizing` attribute. So this means that the `suffix` variable will be equal to the value of `data-sizing`, but because the 
base color' input does not have any unit suffix, we will also have to specify 'nothing', as a fallback, and so we will use the logical OR operator ( || ). 

````js
const suffix = this.dataset.sizing || `;
````

Updating the CSS variables - In order to select a CSS variable we will first have to select the entire document (the `root`), which is the `documentElement` object, and create a variable based on the `name` attribute of the `<input>` tag. We can notice that the `name` value of each specific `<input>` tag corresponds to the CSS variable name we set in the beginning, and so we can use the `name` attribute to act as a selector for the CSS variables. We would do that with `.style.setProperty()`, and in the parentheses, instead of selecting each CSS variable, we will simply assign the `name` attribute using template literals, and so whenever we change the slider value, the corresponding `name` value of that specific slider will be selected as the CSS variable. Now we will also need to append the `suffix` variable to the changed value, because if we won't the value will change but won`t take an effect in the UI, since the CSS requires specific units. 

````js
document.documentElement.style.setProperty(`--${this.name}`, 	this.value + suffix);
````

Now, whenever we change the slider position or choose a different color, it will immediately and dynamically will take effect in the document and will affect the image.

Scoping CSS variables - We can also scope CSS variables inside specific elements which then it can override the values of the root variables, as in a typical specific CSS cascade rules. 

## Full code - CSS:

````CSS
/* CSS Variables */
   :root {
     --base: #ffc600;
     --spacing: 10px;
     --blur: 10px;
   }
   /*
     misc styles, nothing to do with CSS variables
   */

   img {
     padding: var(--spacing);
     background: var(--base);
     filter: blur(var(--blur));
   }

   body {
     text-align: center;
     background: #193549;
     color: white;
     font-family: `helvetica neue`, sans-serif;
     font-weight: 100;
     font-size: 50px;
   }

   .hl {
     color: var(--base);
   }

   .controls {
     margin-bottom: 50px;
   }

   input {
     width: 100px;
   }
````

## Full code- JavaScript:

````javascript
const inputs = document.querySelectorAll(`.controls input`);
 	 
function handleUpdate() {
const suffix = this.dataset.sizing || ''; 	     document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
   }

inputs.forEach(input => input.addEventListener(`change`, handleUpdate));
inputs.forEach(input => input.addEventListener(`mousemove` , handleUpdate));

````