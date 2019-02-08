
document.addEventListener('keydown', playSound);

function playSound(e) {
    const pressSound = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    const keyPress = document.querySelector(`div[data-key="${e.keyCode}"]`);
    
    if(!pressSound) return; // If not an audio file that corresponds to the keyCode value, then upon pressing the function will stop.

    pressSound.currentTime = 0; // Rewind sound on press

    pressSound.play();

    keyPress.classList.add('playing');  
}

const allKeys = document.querySelectorAll('.key');

allKeys.forEach(key =>
    key.addEventListener('transitionend', removeTransition));

function removeTransition(e) {
    if(e.propertyName !== 'transform') return;
    this.classList.remove('playing'); // 'this' keyword refers to the object that called the function, in this case it's the 'key' object, which in the other event listener got assigned with the 'playing' class.
}