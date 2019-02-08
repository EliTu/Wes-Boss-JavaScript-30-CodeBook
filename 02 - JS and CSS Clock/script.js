/* Description:
- We have a clock with 3 handles (arms), one for hours, one for minutes and one for seconds. By default, they are all stacked upon each other.
- We want the clock to work properly by displaying the current time we're on.
- The arms should realign themselves according to the time, that means we need to rotate them, but by default the CSS rotate animation rotates the element on the axis from his center, while we need to initiate a rotation from the bottom part.
- Another issue we have by default is that all the handles are starting from "9 o'clock" because the handle elements are all divs, they are blocks and so the go from left to right by default, so we need to set them top to bottom as well, to align them on "12 o'clock".
*/

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