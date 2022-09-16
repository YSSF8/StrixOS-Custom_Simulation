// Custom cursor
document.addEventListener('mousemove', e => {
    const ptr = document.querySelector('.cursor');
    let mouseX = e.clientX, mouseY = e.clientY;
    ptr.style.left = mouseX + 'px';
    ptr.style.top = mouseY + 'px';
});

// Opens the text editor when double clicking on the text editor desktop icon
document.querySelector('.te').addEventListener('dblclick', () => {
    Gui('Text Editor', 'te-win', 'textarea');
});

// Opens Google when double clicking on the G desktop icon
document.querySelector('.ggl').addEventListener('dblclick', () => {
    Gui('Google', 'ggl-win', 'iframe');
});

// Opens the text editor when clicking on the text editor taskbar icon
document.querySelector('.tb-te').addEventListener('click', () => {
    Gui('Text Editor', 'te-win', 'textarea');
});

// Opens Google when clicking on the G taskbar icon
document.querySelector('.tb-ggl').addEventListener('click', () => {
    Gui('Google', 'ggl-win', 'iframe');
});

// Gui Open
var guiCount = 0;

function Gui(title, win, inside) {
    // Creates the window itself
    guiCount++;
    const window = document.createElement('div');
    window.classList.add('window', win, 'window-' + guiCount);
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
    const ClzBtn = document.createElement('div');
    ClzBtn.classList.add('close-btn');
    ClzBtn.innerHTML = '<i class="fa fa-times"></i>';
    document.querySelector('.bar-' + guiCount).appendChild(ClzBtn);

    // Creates what inside the window
    const inWin = document.createElement(inside);
    inWin.classList.add('inside');
    inWin.src = 'https://www.google.com?igu=1';
    document.querySelector('.window-' + guiCount).appendChild(inWin);

    // Text Editor auto focus
    if (inside == 'textarea') {
        const ta = document.querySelector('textarea');
        ta.focus();
        ta.spellcheck = false;
        ta.ariaLabel = 'text-editor';
    } else {
        inWin.classList.add('iframe-' + guiCount);
    }

    // Open apps transition
    setTimeout(() => {
        window.style.transform = 'scale(1)';
    });

    // Gui Close
    ClzBtn.addEventListener('click', () => {
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

    // Custom cursor disables after hovering on the "Google" iframe
    // Selects the iframe
    const iframeSelector = document.querySelector('.iframe-' + guiCount);

    // Removes the custom cursor when it enters the "Google" window
    iframeSelector.addEventListener('mouseover', () => {
        document.querySelector('.cursor').style.visibility = 'hidden';
    });

    // Adds the custom cursor when it enters the "Google" window
    iframeSelector.addEventListener('mouseout', () => {
        document.querySelector('.cursor').style.visibility = 'visible';
    });
}

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
});

// Removes the custom cursor when it leaves the window
document.addEventListener("mouseleave", () => {
    document.querySelector('.cursor').style.visibility = 'hidden';
});

// Adds the custom cursor when it leaves the window
document.addEventListener('mouseenter', () => {
    document.querySelector('.cursor').style.visibility = 'visible';
});

// Disables the developer tools
document.onkeydown = function (e) {
    // F12 Shortcut, F3 Shortcut, F6 Shortcut, F10 Shortcut, F7 Shortcut
    if (event.keyCode == 123 || event.keyCode == 114 || event.keyCode == 117 || event.keyCode == 121  || event.keyCode == 118) {
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

// Clears the console (LOOP)
setInterval(() => {
    console.clear();
});