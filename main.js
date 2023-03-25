fetch('https://BingoAPI.darksidex37.repl.co')
    .then(res => res.json())
    .then(data => {
        document.querySelector('.bg').src = data.url;
    });

document.querySelectorAll('img').forEach(img => img.setAttribute('draggable', 'false'));

const container = document.body;

const selectionBox = document.createElement('div');
selectionBox.classList.add('selection-box');

let startX, startY;
let isSelecting = false;

container.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
    isSelecting = true;

    selectionBox.style.left = startX + 'px';
    selectionBox.style.top = startY + 'px';
    selectionBox.style.width = '0px';
    selectionBox.style.height = '0px';

    container.appendChild(selectionBox);
});

container.addEventListener('mousemove', (e) => {
    if (isSelecting) {
        const currentX = e.clientX;
        const currentY = e.clientY;
        const width = currentX - startX;
        const height = currentY - startY;

        selectionBox.style.width = Math.abs(width) + 'px';
        selectionBox.style.height = Math.abs(height) + 'px';
        selectionBox.style.left = (width < 0 ? currentX : startX) + 'px';
        selectionBox.style.top = (height < 0 ? currentY : startY) + 'px';
    }
});

container.addEventListener('mouseup', () => {
    isSelecting = false;

    container.removeChild(selectionBox);
});

window.addEventListener('mouseout', e => {
    if (e.relatedTarget === null) {
        isSelecting = false;

        try {
            container.removeChild(selectionBox);
        } catch (err) {
            return;
        }
    }
});

function appGui(app = '') {
    const win = document.createElement('div');
    if (app == 'notepad') {
        win.innerHTML = `
            <div class="header">
                <div class="title">Notepad</div>
                <div class="close"><i class="fa-light fa-xmark"></i></div>
            </div>
            <div class="body">
                <textarea class="main" autofocus></textarea>
            </div>
        `;
    } else if (app == 'google') {
        win.innerHTML = `
            <div class="header">
                <div class="title">Google</div>
                <div class="close"><i class="fa-light fa-xmark"></i></div>
            </div>
            <div class="body">
                <iframe src="https://www.google.com/?igu=1" class="main" oncontextmenu="return false;"></iframe>
            </div>
        `;
    }
    win.classList.add('window', app);
    document.body.appendChild(win);

    function makeDraggable(elmnt) {
        let currentPosX = 0,
            currentPosY = 0,
            previousPosX = 0,
            previousPosY = 0,
            isDragging = false;

        if (win.querySelector('.header')) {
            win.querySelector('.header').onmousedown = dragMouseDown;
        } else {
            win.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e.preventDefault();
            previousPosX = e.clientX;
            previousPosY = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            isDragging = true;
            window.addEventListener('selectstart', disableSelection);
        }

        function elementDrag(e) {
            e.preventDefault();
            currentPosX = previousPosX - e.clientX;
            currentPosY = previousPosY - e.clientY;
            previousPosX = e.clientX;
            previousPosY = e.clientY;
            elmnt.style.top = elmnt.offsetTop - currentPosY + 'px';
            elmnt.style.left = elmnt.offsetLeft - currentPosX + 'px';

            isSelecting = false;
            container.removeChild(selectionBox);
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            isDragging = false;
            window.removeEventListener('selectstart', disableSelection);
        }

        function disableSelection(e) {
            if (isDragging) {
                e.preventDefault();
            }
        }
    }

    makeDraggable(win);

    setTimeout(() => win.style.transform = 'translate(-50%, -50%) scale(1)');

    const closeBtn = win.querySelector('.header .close');

    closeBtn.addEventListener('click', () => {
        win.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => closeBtn.parentElement.parentElement.remove(), 200);
    });

    document.addEventListener('keyup', e => {
        if (e.altKey && e.key == 'c') closeBtn.click();
    });
}

document.querySelectorAll('.app').forEach(app => {
    app.addEventListener('dblclick', () => {
        if (app.classList.contains('notepad')) {
            appGui('notepad');
        } else {
            appGui('google');
        }
    });
});

let startMenu = {
    menu: document.querySelector('.start-menu'),
    isMenu: false
}

const searchField = document.querySelector('.start-menu input');
const apps = document.querySelectorAll('.start-menu img[data-name]');

searchField.addEventListener('input', () => {
    const filter = searchField.value.toUpperCase();
    for (let i = 0; i < apps.length; i++) {
        const appName = apps[i].getAttribute('data-name').toUpperCase();
        if (appName.indexOf(filter) > -1) {
            apps[i].style.display = '';
        } else {
            apps[i].style.display = 'none';
        }
    }
});

document.querySelectorAll('.taskbar img').forEach(icon => {
    icon.addEventListener('click', () => {
        switch (true) {
            case /logo/gi.test(icon.getAttribute('src')):
                startMenu.isMenu = !startMenu.isMenu;

                if (startMenu.isMenu) {
                    startMenu.menu.style.bottom = '-5.5rem';
                } else {
                    startMenu.menu.removeAttribute('style');
                }
                break;
            case /texteditor/gi.test(icon.getAttribute('src')):
                appGui('notepad');
                break;
            case /google/gi.test(icon.getAttribute('src')):
                appGui('google');
                break;
        }

        searchField.value = '';

        for (let i = 0; i < apps.length; i++) {
            apps[i].style.display = '';
        }
    });
});

document.querySelectorAll('.start-menu img').forEach(app => {
    app.addEventListener('click', () => {
        if (/texteditor/gi.test(app.src)) {
            appGui('notepad');
        } else if (/google/gi.test(app.src)) {
            appGui('google');
        }

        startMenu.isMenu = false;
        startMenu.menu.removeAttribute('style');
    });
});

document.addEventListener('contextmenu', e => {
    e.preventDefault();
});

document.querySelector('.lang').innerHTML = navigator.language;

function dateTime() {
    const time = new Date();

    const date = {
        hours: addZero(time.getHours()),
        minutes: addZero(time.getMinutes()),
        day: addZero(time.getDate()),
        month: addZero(time.getMonth() + 1),
        year: time.getFullYear()
    }

    document.querySelector('.hrs').innerHTML = date.hours;
    document.querySelector('.mins').innerHTML = date.minutes;
    document.querySelector('.day').innerHTML = date.day;
    document.querySelector('.month').innerHTML = date.month;
    document.querySelector('.yr').innerHTML = date.year;

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }
}

setInterval(dateTime, 1000);

let themeLimiter = 0;

document.querySelector('.themes').addEventListener('click', () => {
    themeLimiter++;
    const win = document.createElement('theme-manager');
    document.body.appendChild(win);

    startMenu.isMenu = false;
    startMenu.menu.removeAttribute('style');

    if (themeLimiter > 1) win.remove();
});

class ThemeManager extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="header">
            <span>Theme Manager</span>
            <span><i class="fa-light fa-check"></i> Apply</span>
            <span><i class="fa-light fa-xmark"></i></span>
        </div>
        <textarea></textarea>
        `;
        setTimeout(() => this.style.opacity = 1);

        const textarea = this.querySelector('textarea');
        textarea.focus();

        document.body.style.pointerEvents = 'none';

        const closeBtn = this.querySelector('.header span:last-child');

        closeBtn.addEventListener('click', () => {
            this.style.opacity = 0;
            setTimeout(() => this.remove(), 200);
            themeLimiter = 0;
            document.body.removeAttribute('style');
        });

        const style = document.createElement('style');
        document.head.appendChild(style);

        this.querySelector('.header span:nth-child(2)').addEventListener('click', () => {
            if (textarea.value != '') {
                style.innerHTML = textarea.value;
                localStorage.setItem('theme', textarea.value);
            } else {
                localStorage.removeItem('theme');
            }
        });

        const closeChars = new Map([
            ['{', '}'],
            ['[', ']'],
            ['(', ')'],
            ['"', '"'],
            ['\'', '\'']
        ]);

        textarea.addEventListener('input', function (e) {
            const pos = e.target.selectionStart;
            const val = [...e.target.value];

            const char = val.slice(pos - 1, pos)[0];
            const closeChar = closeChars.get(char);

            if (closeChar) {
                val.splice(pos, 0, closeChar);
                e.target.value = val.join('');
                e.target.selectionEnd = pos;
            }
        });

        document.addEventListener('keyup', e => {
            if (e.key == 'Escape') closeBtn.click();
        });
    }
}

customElements.define('theme-manager', ThemeManager);

window.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    const theme = localStorage.getItem('theme');
    if (theme) {
        style.innerHTML = theme;
    }
    document.head.appendChild(style);
});

navigator.geolocation.getCurrentPosition(pos => {
    let latitude = pos.coords.latitude,
        longitude = pos.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=50a7aa80fa492fa92e874d23ad061374`)
        .then(res => res.json())
        .then(data => {
            let description = data.weather[0].description;
            description = description.charAt(0).toUpperCase() + description.slice(1);

            document.querySelector('.name span').innerHTML = data.name;
            document.querySelector('.desc span').innerHTML = description;
            document.querySelector('.wind-speed span').innerHTML = data.wind.speed;
        });
});