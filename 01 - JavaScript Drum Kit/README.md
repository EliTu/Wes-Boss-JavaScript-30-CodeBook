# Project #1 - JavaScript Drum Kit
### *By Eliad Touksher*

## New things learned from this project:
* HTML `data-*` attribute which allows us to create a custom attribute in HTML.
* Using JavaScript to Access an element in the DOM based on his attribute (using the [ ]). 
* eventListener with `keydown` (or  `keypress`) and `transitionend` event. 
* Short single-purposed `if` statements that take a boolean and if it's true it `return` and terminates the function.
* `.currentTime` object that sets the time of certain variable or object.
* `.play()` method, that plays a media file located in the DOM.
* `.querySelectorAll()` method that selects all the instances that are specified in the brackets.
* `.forEach()` method that loops over each element of an array and performs a task that is specified as a function inside the brackets. 
Creating a function declaration for eventListener is better than anonymous functions attached to the eventListener itself.

### Intro: 
In this Challenge, we will create a little app that plays various drum sounds according to the corresponding key press. In the HTML file, we have various sound files that correspond to the keys, and we should whenever a key is pressed, the corresponding sound should be herd.  In addition, there's a special 'playing' class in the CSS file, that highlights the outlines of the key border box and make it scale by 1.1 briefly. 

### User stories:
When I press on the keyboard on the corresponding keys, I should hear the corresponding sound played. Pressing on any other keys won``t have any effect.
The sound effect should be reset upon each press of the key. 
When the key is pressed and the sound played, I should also be able to see a visual indication that the effect took place, ideally with animation.

### Solution map:
Create an event listener that waits for keyboard press, upon pressing the correct key, a sound will be played (sound files provided in the HTML file already). 
Toggle the 'playing' class that has the CSS animation that should be triggered upon the key press, together with the sound.
After the animation finished the class needs to be toggled off, we can create another event listener with `transitionend` event. 

## Wes`` Solution:

First of all, we will look at the HTML file, we could see we have a bunch of `<div>` with the class of “key”. Each one of them has the information of the sound it should make and the key that needs to be pressed, but more importantly is that we need to know about the keyboard is that whenever we press any key, the computer registers a key code, which is a number that is associated with that particular key (for example ``a`` = 65). So when we press ``a`` on the keyboard, it will register as 65, and so if we will look in the keys and the `<audio>` files, they both have an attribute with the name `data-key`.

HTML `data-*` attribute - This is not a real standard in HTML, it was brought up in HTML when people started making their own attributes and data types to put in their HTML code, and so HTML introduced the `data-` attribute in order to allow people to bind their own data and information in a custom made attribute, and so in our case, `data-key` is just a way to indicate that a certain number is the key code of that specific key. We use the `data-` attribute to log and allow the code to find the key and sound that correspond to the value of the `data-key`, so when we press 65, the code will know that we pressed 'a' it will associate the sound file that also has the `data-key` of 65 and it will be able to perform the animation on that HTML element.

Creating an event listener - We will go over to the JS script file and start writing our script. The first thing we will need to do is to create an event listener that listens to keyboard presses. We will be listening to the `document` or `window` (any will work), and the event will be `keypress`  or `keydown`. Next, we have a function that has a parameter of an event, which we will name 'e': 

````javascript
document.addEventListener('keydown', (e) => {
} 
````

If we console log the 'e' parameter we can see that whenever we press any key on the keyboard the event listener logs `KeyboardEvent` object that has a lot of information inside of it about the key we pressed, including the corresponding key code associated with that specific keys. If we log `e.keyCode`, the console will print the corresponding keyCode value. 

Variable for the audio elements - With this, we can see that we can link the key pressing with the relevant elements in the HTML file. So we will create a variable that represents an audio element with `querySelector`, but it will fixate itself according to the `data-key` that corresponds to the key code of the pressed key. We can do that by selecting an attribute (since `data-key` is an HTML attribute) the same way we select attributes in CSS, with [ ]. We will use back-ticks (` `) to create a literal template for the value, which will be `e.keyCode`, and now it will select elements if they correspond to the key code of the pressed key. Note that additional double quotes are required around the number (the value of `e.keyCode`), back-ticks alone won``t work.

````javascript 
document.addEventListener('keydown', (e) => {
constpressSound = document.querySelector(`audio[data-key="${e.keyCode}"]`);
} 
````

Disabling irrelevant keys - If we log the `pressSound` variable to the console and press the relevant keys, it will log the corresponding element. But pressing any other key that does not have a corresponding `data-key` attribute will result in `null`. And so to not let that happen, we could do a simple `if` statement with an empty `return` (`return` causes the function to stop and “exit”), in order to stop the function from running when it could not find the element with the `daya-key` attribute. 

````javascript	
if(!pressSound) return; 
````

Play sounds - Now because we can find these audio elements with our key presses, we could play them, and for that, we can use a simple method `.play()`. This will trigger the sound file to play upon a press.

````javascript
pressSound.play();
````

Restarting the play time on the audio - Now we can note that the sound does play upon a relevant keypress, but the problem is that it waits for the sound to be finished before restarting it, so if we want to press `a` couple of times to repeat the sound, each time we have to wait for the sound to be finished in order for it to replay again, which is not our intention, we want to make it replay upon a press, no matter how brief it is. So what we need to do is before the `.play()` method we need to create the `.currentTime` object, which will reinitiate the timeout of the audio file, so when we press the button, again and again, it will lunch the audio file from the start upon each press. The `.currentTime` with the value of 0 simply rewinds the file to its start, so upon each press, the file will play from the very start.

````javascript
pressSound.currentTime = 0; 
pressSound.play(); 
````

Variable for the `key` <div> element - Next we would like to create a variable in order to select the <div> elements with the 'key' class in order to be able to apply the animation on them later. We could do that the same way we did with the <audio> element, but this time we can select the <div> element or the class `.key`, and it will also correspond to the relevant key code as we did with the <audio> element.

````javascript
const keyPress = document.querySelector(`div[data-key="${e.keyCod	e}"]`);	
````

Applying the animation, adding the `.playing` class - We will take a look in our CSS file and observe the `.key` class CSS rules, what's important is that we have `transition` property: 

````CSS
transition: all .07s ease; 
````

When we add the class `.playing` to the <div> with the `.key` class, we going to make the animation effect that scales and transforms the border colors and box-shadows.

````CSS
.playing {
 transform: scale(1.1);
 border-color: #ffc600;
 box-shadow: 0 0 1rem #ffc600;
} 
````

So in order for us to apply the class to the `keyPress` variable that we've created, we will use the .classList object with `.add` in order to add a class to the variable.

````javascript
keyPress.classList.add('playing'); 
````

Now we see that the class is being added to the elements upon pressing the relevant keys, but the problem is that the class is added and stays there unless we reload the page, and so we will also have to remove the class to make the animations complete and reiterable. 

Removing the `.playing` class upon event end - Theoretically speaking, we could've to that with the `setTimeOut` method: 

````javascript
setTimeout(function {
   keyPress.classList.remove('playing');
}, .07);
````

But it's not the ideal method we should use! What could happen is that it won't be consistent with the timeout timer we have in the CSS file and if someone will later change any of them, they will become inconsistent and it will ruin the animation, so we need a better way to do that. What we can do instead of setting a timer, is setting a transition end event that will fire upon the end of the transition animation. 

`transitionend` event listener - `transitionend` is an event that happens after a transition has ended, in our case the transition is the scaling and changing of the border and shadow of the keyPress variable. We first have to create a variable for all the `.key` elements (the variable we created earlier is for the keyCode value of those keys, we do not need it now), and then we will create an eventListener that will listen to these keys. This time we could use `querySelectorAll` to mark all the elements with `.key` class.

````javascript
const allKeys = document.querySelectorAll('.key'); 
````

This creates an array of all the <div> elements with the `.key` class. Now we can make an eventListener that listens to `transitionend` event, but we need to make it for each element in the ``allKeys` array, and so we can use the array method `forEach()`. And for every element in the array, we attach an eventListener with a function that will remove the `.playing` class, which we will create after.

````javascript
allKeys.forEach(key =>
   key.addEventListener('transitionend', removeTransition)); 
````

Why not simply make an eventListener as we did before? i.e , why do we need to use the `forEach()` method here? When we have an array of elements we can't just attach an event listener and expect it to listen to each and every element in the array, but we need to loop through it first (We could also to that with a `for` loop, but `forEach()` is a simpler and cleaner way to loop over an array). 

`removeTransition` function - Next we create the `removeTransition` function that takes an argument which is the `event` ('e' parameter). 

````javascript
function removeTransition(e) {
} 
````

If we will try to log 'e' inside the function (which is already attached to the event listener), the console will print a list of all the transitions taking place, one of them is with the property name of  `transform`, the CSS rule that basically scales the element. We will use the `transform` transition as our indicator to skip the removal of the `playing` class. For that, we will make another `if` statement to mark the `propertyName` of the 'e', and its value will be `transform`, and we will say that if the `propertyName` of that event is not `transform`, then we `return` (end the function).

````javascript
if(e.propertyName !== 'transform') return; 
````

Now if we will log `e.propertyName` we could see that upon pressing the relevant keys it is loging ``transform`` to the console, as this is the value of the property name that is taking effect. Now it means that after it's done transforming, we could remove the `.playing` class and end the transition completely. We will write the function using the `this` keyword, which will point to the object that has called it, which in our case will be the `key` (since it's attached to the eventListener that has called the function). Next, we simply remove the class the same way we added it.

````javascript
if(e.propertyName !== 'transform') return;
   this.classList.remove('playing'); 
````

Now upon pressing the relevant keys on the keyboard, the animation fires and removes itself after 0.07 seconds, as intended. Even if we go to the dev tools in Chrome and try to manually attach the `playing` class to an element, it will remove it after 0.07 because the eventListener is always listening.

Finishing touches - Wes personally doesn't like attaching an anonymous function to an eventListener, and so we will remove the function that is added to the `keydown` event, write it outside as a separate function and make a callback function named `playSound` in the event listener. Now if in the future we would like to play sounds based on something else, we could do that easily with a separate function that will attach itself to the `eventLIstener`.

Full Code:

````javascript
document.addEventListener('keydown', playSound);

function playSound(e) {

constpressSound= document.querySelector(`audio[data-key="${e.keyCode}"]`);

constkeyPress= document.querySelector(`div[data-key="${e.keyCode}"]`);
  
if(!pressSound) return; 
pressSound.currentTime = 0; 

pressSound.play();

keyPress.classList.add('playing'); 
}

const allKeys = document.querySelectorAll('.key');

allKeys.forEach(key =>
   key.addEventListener('transitionend', removeTransition));

function removeTransition(e) {
   if(e.propertyName !== 'transform') return;
   this.classList.remove('playing'); 
}
````
