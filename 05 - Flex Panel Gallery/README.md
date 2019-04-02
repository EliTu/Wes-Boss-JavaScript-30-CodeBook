# Project #5 - Flex Panels Image Gallery

### _By Eliad Touksher_

## New things learned in this project

- Better understanding of the application of CSS flexbox, with flexbox item display and nested flexbox containers.
- The "grow" effect of flexbox items by applying `transition` on the `flex` property.
- Another usage example of the `transitionend` event.
- Noticing multiple events being triggered at once by viewing the `event` parameter and the `propertyName`.

## Intro

We'll be creating a small "Flex Gallery", which is basically a couple of panels that upon a click expand with a cool transition animation, and also show extra text that slides from the top and bottom sides. This little page will mostly be relying on CSS Flexbox to achieve the panel sizing scale, CSS Transitions for the transition effect and some JavaScript to apply the CSS on each panel.

## User stories

Upon a click on each individual panel, I should see its right and left border "opening" (or expanding) and taking more space, after the border finished expanding, I should see extra text being moving in from the bottom and the top. I could open multiple panels, or potentially all of them, and the transition effects will take place just the same. Another click on an opened panel will "close" it back to its original position and remove the extra text.

## Solution map

We should first set Flexbox properties to the panel container, as well as to the individual panels, so that they will be able to flexibly take the same amount of space, as well as allow the nested items, such as the `<p>` tags, to be centered correctly. We will need to add several `transform: translateY()` properties to the "bottom" and "top" `<p>` elements inside the panels so they could be transitioned from the top and bottom upon the panel opening/closing. Lastly, have several CSS state classes and apply them using JavaScript event listeners, that would be listening to clicks upon the panels and transition end events.

## Wes' solution

**Setting up the Flexbox properties** - First, we can notice that the panels by the default CSS properties are located side by side, and so we will want first to go to the `.panels` container and set the `display` to `flex`, which will make them go side by side, but with a "squeezed" individual position, where the space that each panel takes is the width of the text inside.

```css
.panels {
  min-height: 100vh;
  overflow: hidden;
  display: flex;
}
```

Next we go to each of the individual panels and set that each panel will take the extra space, and they will all share equal amount of space between them. We go to the `.panel` class selector and set `flex: 1`, which will make sure that each element with the class of 'panel' will evenly distribute the space among each other. Next we would like to set the position of the `<p>` elements inside of each individual panel: we use `justify-content: center` to center the items left and right, `align-items: center` which will further center the items. More importantly, we would like set for each individual panel `display: flex` too, essentially making each one a flex container too, and thus shows a good example of nested flexbox container. By doing that, the panel items will be positioned in the middle of the panel, but stacked left-to-right, as this is the default flex position, and so to change that we add `flex-direction: column`, and that will set the items vertically again.

```css
.panel {
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
```

**Setting up the flex item properties** - Next we go to the selector of all the children of the panel class `panel > *`. We set `flex: 1 0 auto` and that will basically position the items seperatley across the panel in 3 different positions, set `display: flex`, `justify-content: center` and `align-items: center` which will get each individual panel item centered perfectly within the flex container (which is each of the panels). Basically we have a lot of flexbox nesting action going on here, which is required to achieve the desired effect on the panels, as well as on their items.

```css
.panel > * {
  margin: 0;
  width: 100%;
  transition: transform 0.5s;
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Setting up the transition effects for the panel items** -
Now that we have the panel items, the `<p>` tags sorted in a top-center-bottom position, we would like to make the top and the bottom `<p>` tags to be set off screen by default, and only to transition themselves into their intended position upon a click on the panel. We can use the `translateY()` property for that, and so we will go ahead and use this property to set the first child, the top `<p>`, and the last child, the bottom `<p>`, a position off the screen by setting their `translateY()` values off the screen, `-100%` and `100%`,respectively. At the same time, we will want to preset a special 'active' class, that will be applied on the panel items by the click on the panel, and it will reposition the first and last children on the screen again with a transition animation by setting the `translateY()` value to the default 0.

```css
.panel > *:first-child {
  transform: translateY(-100%);
}

.panel.open-active > *:first-child {
  transform: translateY(0);
}

.panel > *:last-child {
  transform: translateY(100%);
}

.panel.open-active > *:last-child {
  transform: translateY(0);
}
```

**Setting the panel "grow" transition effect** - We would also like to each panel to be able to grow in its size upon a click, having a sort of "expand" transition effect. And so we can go to the `.panel .open` CSS selector, and set `flex: 5` which means that when the class of `.open` is applied on a panel, it will take 5 times the amount of space that it takes by default (which is set to 1). The panel is able to make the transition effects because of the `.panel` class has `transition` properties applied to it, which affect the `font-size`, `background` and `flex` properties, which gives this open and close feeling upon a click.

```css
.panel.open {
  font-size: 40px;
  flex: 5;
}
```

**Adding the JavaScript** - Now that we have the classes set up, we will use JavaScript to add the interactive part, and attach event listeners to the panels. First, we will get all the panels.

```js
const panels = document.querySelectorAll(".panel");
```

Now that we have a node list of all the panels in the DOM, we can loop over them and attach an event listener that listens to a `click` event and execute functions that add the desired classes to the panels. We will start with adding the `.open` class and writing its callback function right after.

```js
panels.forEach(panel => panel.addEventListener("click", togglePanel));
```

Now we will write the `togglePanel` function that simply toggles the `.open` class on the clicked panel.

```js
function togglePanel() {
  this.classList.toggle("open");
}
```

Now if we click on each panel, it will add the `.open` class, and upon another click on that same panel it will remove the class. When the class is added, the panel expands as intended, and this could be applied to multiple panels, all growing in size accordingly and spliting the page space between them. Next, we would like to set the transition effects for the panel top and bottom `<p>` items. We want them to be transitioned in when the `click` event ends, and so this time we will loop over the panels again and listen to the `transitionend` event, while also toggling another callback function that we will write right after.

```js
panels.forEach(panel => panel.addEventListener("transitionend", toggleActive));
```

Once again we would like to toggle the class of `.open-active` on the panels, but there going to be multiple transition ends that occur. We can see them if we `console.log` the `propertyName` of the event, and so we can see that what has transitioned is `font-size` and `flex-grow`, as specified in the CSS transition property we set for `.panel-open` class. We're interested in the `flex-growth` and so we will set an `if` statement that will check if the `propertyName` has the word `flex` in it using the `contains()` method, and that is because some browsers specify the `propertyName` as `flex-grow` and some as `flex`, and so to avoid bugs we will simply look for `flex` in the string, if its `true` then we will go ahead and toggle the `.open-active` class to that panel, which will bring in the first and last `<p>` children from off the screen. Upon clicking on the opened panel again, the class will be removed and the child elements will be moved off screen again.

```js
function toggleActive(e) {
  if (e.propertyName.includes("flex")) {
    this.classList.toggle("open-active");
  }
}
```

## Full code - CSS

```css
html {
  box-sizing: border-box;
  background: #ffc600;
  font-family: "helvetica neue";
  font-size: 20px;
  font-weight: 200;
}

body {
  margin: 0;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.panels {
  min-height: 100vh;
  overflow: hidden;
  display: flex;
}

.panel {
  background: #6b0f9c;
  box-shadow: inset 0 0 0 5px rgba(255, 255, 255, 0.1);
  color: white;
  text-align: center;
  align-items: center;
  transition: font-size 0.7s cubic-bezier(0.61, -0.19, 0.7, -0.11), flex 0.7s
      cubic-bezier(0.61, -0.19, 0.7, -0.11), background 0.2s;
  font-size: 20px;
  background-size: cover;
  background-position: center;
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.panel1 {
  background-image: url(https://source.unsplash.com/gYl-UtwNg_I/1500x1500);
}

.panel2 {
  background-image: url(https://source.unsplash.com/rFKUFzjPYiQ/1500x1500);
}

.panel3 {
  background-image: url(https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&w=1500&h=1500&fit=crop&s=967e8a713a4e395260793fc8c802901d);
}

.panel4 {
  background-image: url(https://source.unsplash.com/ITjiVXcwVng/1500x1500);
}

.panel5 {
  background-image: url(https://source.unsplash.com/3MNzGlQM7qs/1500x1500);
}

/* Flex Children */
.panel > * {
  margin: 0;
  width: 100%;
  transition: transform 0.5s;
  flex: 1 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.panel > *:first-child {
  transform: translateY(-100%);
}

.panel.open-active > *:first-child {
  transform: translateY(0);
}

.panel > *:last-child {
  transform: translateY(100%);
}

.panel.open-active > *:last-child {
  transform: translateY(0);
}

.panel p {
  text-transform: uppercase;
  font-family: "Amatic SC", cursive;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
  font-size: 2em;
}

.panel p:nth-child(2) {
  font-size: 4em;
}

.panel.open {
  font-size: 40px;
  flex: 5;
}
```

## Full code - JavaScript

```js
// Get the panels:
const panels = document.querySelectorAll(".panel");

// Function to toggle 'open' class:
function togglePanel() {
  this.classList.toggle("open");
}

// Upon event add open-active class to the clicked panel:
function toggleActive(e) {
  if (e.propertyName.includes("flex")) {
    this.classList.toggle("open-active");
  }
}

// listen to a click on each panel and add the open class:
panels.forEach(panel => panel.addEventListener("click", togglePanel));

// listen to transitionend event:
panels.forEach(panel => panel.addEventListener("transitionend", toggleActive));
```
