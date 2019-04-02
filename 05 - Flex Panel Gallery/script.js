// Get the panels:
const panels = document.querySelectorAll('.panel');

// Function to toggle 'open' class:
function togglePanel() {
    this.classList.toggle('open');
}

// Upon event add open-active class to the clicked panel:
function toggleActive(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}

// listen to a click on each panel and add the open class:
panels.forEach(panel => panel.addEventListener('click', togglePanel));

// listen to transitionend event:
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));