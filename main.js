import { alert } from './xorio.js';


// Opens the text editor when double clicking on the text editor desktop icon
document.querySelector('.te').addEventListener('dblclick', () => {
    Gui('Text Editor', 'te-win-', 'textarea');
});

// Opens Google when double clicking on the G desktop icon
document.querySelector('.ggl').addEventListener('dblclick', () => {
    Gui('Google', 'ggl-win', 'iframe');
});

const textEditorOpen = document.querySelectorAll('.te-open'); // Selects every element contains the class "te-open"
const googleOpen = document.querySelectorAll('.ggl-open'); // Selects every element contains the class "ggl-open"

// Loops through the elements contains the class "te-open" so all of them will be affected
textEditorOpen.forEach(opener => {
    // After clicking it will open the "Text Editor" app
    opener.addEventListener('click', () => {
        Gui('Text Editor', 'te-win-', 'textarea');
    });
});

// Loops through the elements contains the class "ggl-open" so all of them will be affected
googleOpen.forEach(opener => {
    // After clicking it will open the "Google" app
    opener.addEventListener('click', () => {
        Gui('Google', 'ggl-win', 'iframe');
    });
});

// Gui Open
var guiCount = 0;

function Gui(title, win, inside) {
    // Creates the window itself
    guiCount++;
    const window = document.createElement('div');
    window.classList.add('window', win + guiCount, 'window-' + guiCount);
    document.body.appendChild(window);

    // Creates the app top-bar
    const topBar = document.createElement('div');
    topBar.classList.add('top-bar', 'bar-' + guiCount);
    document.querySelector(`.window-` + guiCount).appendChild(topBar);

    // Creates the title for the window
    const ttl = document.createElement('div');
    ttl.classList.add('title');
    ttl.innerHTML = title;
    document.querySelector('.bar-' + guiCount).appendChild(ttl);

    // Creates the close app
    const clzBtn = document.createElement('div');
    clzBtn.classList.add('close-btn');
    clzBtn.innerHTML = '<i class="fa fa-times"></i>';
    document.querySelector('.bar-' + guiCount).appendChild(clzBtn);

    // Creates what inside the window
    const inWin = document.createElement(inside);
    inWin.classList.add('inside');
    inWin.src = 'https://www.google.com?igu=1';
    document.querySelector('.window-' + guiCount).appendChild(inWin);

    // Text Editor configuration
    var limit = 0;

    if (inside == 'textarea') {
        inWin.focus();
        inWin.classList.add('area-' + guiCount);
        inWin.spellcheck = false;
        inWin.ariaLabel = 'text-editor';
    } else {
        inWin.classList.add('iframe-' + guiCount);
    }

    // Open apps transition
    setTimeout(() => {
        window.style.transform = 'scale(1)';
    });

    // Gui Close
    clzBtn.addEventListener('click', () => {
        const el = document.querySelector('.window-' + guiCount);
        el.style.transform = 'scale(0)';

        // Close apps transition
        setTimeout(() => {
            guiCount--;
            el.remove();
        }, 180);
    });

    // Makes the windows draggable
    // Original dragging code "https://codepen.io/marcusparsons/pen/NMyzgR"
    function makeDraggable(elmnt) {
        // Make an element draggable (or if it has a .window-top class, drag based on the .window-top element)
        let currentPosX = 0, currentPosY = 0, previousPosX = 0, previousPosY = 0;

        // If there is a window-top classed element, attach to that element instead of full window
        if (elmnt.querySelector('.bar-' + guiCount)) {
            // If present, the window-top element is where you move the parent element from
            elmnt.querySelector('.bar-' + guiCount).onmousedown = dragMouseDown;
        }
        else {
            // Otherwise, move the element itself
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            // Prevent any default action on this element
            e.preventDefault();
            // Get the mouse cursor position and set the initial previous positions to begin
            previousPosX = e.clientX;
            previousPosY = e.clientY;
            // When the mouse is let go, call the closing event
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            // Prevent any default action on this element
            e.preventDefault();
            // Calculate the new cursor position by using the previous x and y positions of the mouse
            currentPosX = previousPosX - e.clientX;
            currentPosY = previousPosY - e.clientY;
            // Replace the previous positions with the new x and y positions of the mouse
            previousPosX = e.clientX;
            previousPosY = e.clientY;
            // Set the element's new position
            elmnt.style.top = (elmnt.offsetTop - currentPosY) + 'px';
            elmnt.style.left = (elmnt.offsetLeft - currentPosX) + 'px';
        }

        function closeDragElement() {
            // Stop moving when mouse button is released and release events
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // The window will only be able to be moved via the top bar (.window-top element). The main element does nothing on mouse down.
    makeDraggable(document.querySelector('.window-' + guiCount));
}

const adminHr = document.getElementById('admin-hr');
const runAsAdmin = document.getElementById('admin-option');

// Custom context menu
// Selects the context menu element
const ctx = document.querySelector('.ctx-menu');

window.addEventListener('contextmenu', e => {
    // Disables the default context menu
    e.preventDefault();

    // Makes the context menu appears
    ctx.style.transform = 'scale(1)';

    // Makes the context menu follows the cursor
    let x = e.clientX, y = e.clientY;
    ctx.style.left = x + 'px';
    ctx.style.top = y + 'px';
});

// Removes the context menu after clicking
document.addEventListener('click', () => {
    ctx.style.transform = 'scale(0)';
    adminHr.style.display = 'none';
    runAsAdmin.style.display = 'none';
});

// Disables the developer tools
document.onkeydown = function (e) {
    // F12 Shortcut, F3 Shortcut, F6 Shortcut, F10 Shortcut, F7 Shortcut
    if (event.keyCode == 123 || event.keyCode == 114 || event.keyCode == 117 || event.keyCode == 121 || event.keyCode == 118) {
        return false;
    }
    // CTRL+SHIFT+I Shortcut
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    // CTRL+SHIFT+C Shortcut
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    // CTRL+SHIFT+J Shortcut
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    // CTRL+U Shortcut
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
    // CTRL+F Shortcut
    if (e.ctrlKey && e.keyCode == 'F'.charCodeAt(0)) {
        return false;
    }
}

// Shows the start menu after clicking on the start icon
document.querySelector('.start-btn').addEventListener('click', () => {
    document.querySelector('.start-menu').classList.toggle('start-show');
    document.querySelector('.pwr-menu').classList.remove('pwr-show');
});

// Shows the power menu after clicking on the power icon
document.querySelector('.pwr-btn').addEventListener('click', () => {
    document.querySelector('.pwr-menu').classList.toggle('pwr-show');
});

const apps = document.querySelectorAll('.app'); // Selects all the elements contains the class "app"

// Loops through the class "app" so this anonymous function can be used on all of them
apps.forEach(app => {
    app.addEventListener('contextmenu', () => {
        adminHr.style.display = 'block';
        runAsAdmin.style.display = 'block';
    });
});

const adminPanel = document.querySelector('.admin-panel'); // Selects the administrator panel

// After clicking on the "Run as administrator" button it will show up the admin panel
runAsAdmin.addEventListener('click', () => {
    adminPanel.style.top = '50%';
    adminPanel.style.opacity = 1;
    adminPanel.style.pointerEvents = 'all';
    document.body.style.pointerEvents = 'none';
    new Audio('./items/admin.mp3').play();
});

let randomText = [
    "It doesn't need admin permitions, idiot",
    "Never gonna give you up, never gonna let you down",
    "Hey yo, stop running it as admin, cuz it's stupid thing<br>Meaning: We don't need it, mf",
    "Why are you gay?",
    "Deez nuts. GOT'EM, haaah"
]

// After clicking on the "yes" button in the admin panel it give the app admin perms
document.querySelector('.option.yes').addEventListener('click', () => {
    adminPanel.style.top = '43%';
    adminPanel.style.opacity = 0;
    adminPanel.style.pointerEvents = 'none';
    document.body.removeAttribute('style');
    alert(randomText[Math.floor(Math.random() * randomText.length)]);
    console.log('%cAdmin accepted', 'color: #00ff00');
});

// After clicking on the "no" button in the admin panel it will abort everything
document.querySelector('.option.no').addEventListener('click', () => {
    adminPanel.style.top = '43%';
    adminPanel.style.opacity = 0;
    adminPanel.style.pointerEvents = 'none';
    document.body.removeAttribute('style');
    console.log('%cAdmin aborted', 'color: #f00');
});

// Shows up the information of the OS
document.addEventListener('keyup', e => {
    if (e.key == 'F9') {
        alert('OS Name: StrixOS<br>Version: 1.4TiG<br>System type: 64-bit operating system');
    }
});