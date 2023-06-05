fetch('https://bingoapi.darksidex37.repl.co')
    .then(res => res.json())
    .then(data => {
        document.querySelector('.bg').src = data.url;
    });

function getUsername() {
    let username = prompt('Username (Optional, max 10 characters):');

    if (username.trim() === '') {
        return 'Guest';
    } else if (username == null) {
        return;
    }

    username = username.replace(/\s+/g, '');

    return username.substring(0, 10);
}

const usernameCheck = localStorage.getItem('username') || (localStorage.setItem('username', getUsername()), 'Guest');
const usernameLabel = document.querySelector('.start-menu .username');

usernameLabel.innerHTML = localStorage.getItem('username');

usernameLabel.addEventListener('click', () => {
    localStorage.setItem('username', getUsername());
    usernameLabel.innerHTML = localStorage.getItem('username');
});

const ctxMenu = document.querySelector('.ctx-menu');

document.addEventListener('contextmenu', e => {
    e.preventDefault();

    let x = e.clientX, y = e.clientY;

    ctxMenu.style.left = x + 'px';
    ctxMenu.style.top = y + 'px';
    ctxMenu.style.transform = 'scale(1)';

    const rect = ctxMenu.getBoundingClientRect();

    if ((rect.x + rect.width) >= window.innerWidth) {
        ctxMenu.style.left = `${x - rect.width}px`;
    }
    if ((rect.y + rect.height) >= window.innerHeight) {
        ctxMenu.style.top = `${y - rect.height}px`;
    }
});

document.addEventListener('mousedown', e => {
    if (e.button == 0) {
        ctxMenu.style.transform = 'scale(0)';
    }
});

ctxMenu.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', () => {
        if (option.classList.contains('username')) {
            localStorage.setItem('username', getUsername());
            usernameLabel.innerHTML = localStorage.getItem('username');
        } else if (option.classList.contains('restart')) {
            location.reload();
        } else if (option.classList.contains('theming')) {
            const theme = document.createElement('theme-manager');
            document.body.appendChild(theme);
        }
    });
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

    try {
        container.removeChild(selectionBox);
    } catch {
        return;
    }
});

window.addEventListener('mouseout', e => {
    if (e.relatedTarget === null) {
        isSelecting = false;

        try {
            container.removeChild(selectionBox);
        } catch {
            return;
        }
    }
});

Math['fact'] = n => {
    if (n == 0 || n == 1) {
        return 1;
    } else {
        return n * Math['fact'](n - 1);
    }
};

function appGui(app = '') {
    const win = document.createElement('div');
    if (app == 'notepad') {
        win.innerHTML = `
            <div class="header">
                <div class="flexible-title">
                    <img src="./img/texteditor.png" height="20" alt="">
                    <div class="title">Notepad</div>
                </div>
                <div class="options">
                    <button id="save"><i class="fa-light fa-floppy-disk"></i> Save</button>
                    <button id="load"><i class="fa-light fa-folder-open"></i> Open</button>
                </div>
                <div class="close"><i class="fa-light fa-xmark"></i></div>
            </div>
            <div class="body">
                <textarea class="main" spellcheck="false" autofocus></textarea>
            </div>
        `;

        win.style.minWidth = '322px';

        const save = win.querySelector('#save');
        const load = win.querySelector('#load');
        const textarea = win.querySelector('textarea');

        save.addEventListener('click', () => {
            if (textarea.value == '') {
                return;
            }

            const saveDialog = prompt('Save as:', 'File.txt');

            if (saveDialog == '' || saveDialog == null || saveDialog == undefined) {
                return;
            }

            const blob = new Blob([textarea.value], { type: 'text/plain' });
            const objURL = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = objURL;
            a.download = saveDialog;
            document.body.appendChild(a);
            a.click();

            setTimeout(() => {
                a.remove();
                URL.revokeObjectURL(blob);
            });
        });

        load.addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            document.body.appendChild(fileInput);

            fileInput.addEventListener('change', e => {
                const file = e.target.files[0];
                const fr = new FileReader();

                fr.addEventListener('load', e => {
                    const content = e.target.result;
                    textarea.value = content;
                });

                fr.readAsText(file);
            });

            fileInput.click();
            fileInput.remove();
        });
    } else if (app == 'google') {
        win.innerHTML = `
            <div class="header">
                <div class="flexible-title">
                    <img src="./img/google.png" height="20" alt="">
                    <div class="title">Google</div>
                </div>
                <div class="close"><i class="fa-light fa-xmark"></i></div>
            </div>
            <div class="body">
                <iframe src="https://www.google.com/?igu=1" class="main" oncontextmenu="return false;"></iframe>
            </div>
        `;
    } else if (app == 'calculator') {
        win.innerHTML = `
            <div class="header">
                <div class="flexible-title">
                    <img src="./img/calculator.png" height="20" alt="">
                    <div class="title">Calculator</div>
                </div>
                <div class="close"><i class="fa-light fa-xmark"></i></div>
            </div>
            <div class="body">
                <br>
                <br>
                <center>
                    <input type="text" disabled>
                    <div class="numbers_operators">
                        <div class="calc-opt op"><i class="fa-light fa-square-root"></i></div>
                        <div class="calc-opt op"><i class="fa-light fa-value-absolute"></i></div>
                        <div class="calc-opt op"><i class="fa-light fa-superscript"></i></div>
                        <div class="calc-opt op"><i class="fa-light fa-delete-left"></i></div>
                        <div class="calc-opt op"><span>n</span><i class="fa-light fa-exclamation"></i></div>
                        <div class="calc-opt op">(</div>
                        <div class="calc-opt op">)</div>
                        <div class="calc-opt op">*</div>
                        <div class="calc-opt num">1</div>
                        <div class="calc-opt num">2</div>
                        <div class="calc-opt num">3</div>
                        <div class="calc-opt op">-</div>
                        <div class="calc-opt num">4</div>
                        <div class="calc-opt num">5</div>
                        <div class="calc-opt num">6</div>
                        <div class="calc-opt op">/</div>
                        <div class="calc-opt num">7</div>
                        <div class="calc-opt num">8</div>
                        <div class="calc-opt num">9</div>
                        <div class="calc-opt op">+</div>
                        <div class="calc-opt op"><i class="fa-light fa-pi"></i></div>
                        <div class="calc-opt num">0</div>
                        <div class="calc-opt op">.</div>
                        <div class="calc-opt op">=</div>
                    </div>
                <center>
            </div>
        `;

        win.style.width = '274px';
        win.style.height = '476px';
        win.style.resize = 'none';

        const inputField = win.querySelector('.body input');

        win.querySelectorAll('.body .calc-opt').forEach(opt => {
            opt.addEventListener('click', () => {
                switch (opt.innerHTML) {
                    case '=':
                        if (inputField.value != '') {
                            try {
                                inputField.value = inputField.value.replace(/sqrt\((.*?)\)/g, 'Math.sqrt($1)');
                                inputField.value = inputField.value.replace(/abs\((.*?)\)/g, 'Math.abs($1)');
                                inputField.value = inputField.value.replace(/(\w+)pow\((.*?)\)/g, 'Math.pow($1, $2)');
                                inputField.value = inputField.value.replace(/fact\((.*?)\)/g, 'Math.fact($1)');
                                inputField.value = eval(inputField.value);
                            } catch {
                                return;
                            }
                        }
                        break;
                    case '<i class="fa-light fa-delete-left"></i>':
                        inputField.value = inputField.value.slice(0, -1);
                        break;
                    case '<i class="fa-light fa-pi"></i>':
                        inputField.value += Math.PI;
                        break;
                    case '<i class="fa-light fa-square-root"></i>':
                        inputField.value += 'sqrt(';
                        break;
                    case '<i class="fa-light fa-value-absolute"></i>':
                        inputField.value += 'abs(';
                        break;
                    case '<i class="fa-light fa-superscript"></i>':
                        inputField.value += 'pow(';
                        break;
                    case '<span>n</span><i class="fa-light fa-exclamation"></i>':
                        inputField.value += 'fact(';
                        break;
                    default:
                        inputField.value += opt.innerHTML;
                        inputField.value = inputField.value.replace(/(\+|-|\*|\/)(\+|-|\*|\/)/g, '$1');
                        inputField.value = inputField.value.replace(/^(\+|\*|\/)/g, '');
                }
            });

            document.addEventListener('keydown', e => {
                if (e.key == opt.innerHTML) {
                    inputField.value += opt.innerHTML;
                    inputField.value = inputField.value.replace(/(\+|-|\*|\/)(\+|-|\*|\/)/g, '$1');
                    inputField.value = inputField.value.replace(/^(\+|\*|\/)/g, '');
                    inputField.value = inputField.value.replace('=', '');
                }
            });
        });

        document.addEventListener('keydown', e => {
            if (e.key == 'Backspace') {
                inputField.value = inputField.value.slice(0, -1);
            } else if (e.key == 'Enter') {
                document.querySelector('.body .op:last-child').click();
            }
        });
    }

    win.classList.add('window', app);
    document.body.appendChild(win);

    win.addEventListener('contextmenu', () => {
        setTimeout(() => {
            ctxMenu.style.transform = 'scale(0)';
        });
    });

    const resizeObserver = new ResizeObserver(entries => {
        for (let i of entries) {
            try {
                container.removeChild(selectionBox);
            } catch {
                return;
            }
        }
    });

    resizeObserver.observe(win);

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

            try {
                container.removeChild(selectionBox);
            } catch {
                return;
            }
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

    setTimeout(() => {
        win.style.transform = 'translate(-50%, -50%) scale(1)';
    });

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
        } else if (app.classList.contains('google')) {
            appGui('google');
        } else if (app.classList.contains('calc')) {
            appGui('calculator');
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

let appNameLimit = 0;

document.querySelectorAll('.taskbar img').forEach(icon => {
    icon.addEventListener('click', () => {
        switch (icon.getAttribute('src').match(/(?<=img\/).+(?=\.png)/g)[0]) {
            case 'logo':
                startMenu.isMenu = !startMenu.isMenu;

                if (startMenu.isMenu) {
                    startMenu.menu.style.bottom = '-5.5rem';
                } else {
                    startMenu.menu.removeAttribute('style');
                }
                break;
            case 'texteditor':
                appGui('notepad');
                break;
            case 'google':
                appGui('google');
                break;
            case 'calculator':
                appGui('calculator');
                break;
        }

        searchField.value = '';

        for (let i = 0; i < apps.length; i++) {
            apps[i].style.display = '';
        }
    });

    icon.addEventListener('mousemove', () => {
        appNameLimit++;

        const elmnt = document.createElement('div');
        elmnt.innerHTML = icon.getAttribute('data-tag');
        elmnt.classList.add('app-tag');
        document.body.appendChild(elmnt);

        setTimeout(() => {
            elmnt.style.transform = 'scale(.8)';
            elmnt.style.opacity = 1;
        });

        const rect = icon.getBoundingClientRect();

        elmnt.style.left = `${rect.x + (rect.width / 2) - (elmnt.offsetWidth / 2)}px`;
        elmnt.style.top = `${rect.y - 40}px`;

        if (appNameLimit > 1) elmnt.remove();
    });

    icon.addEventListener('mouseout', () => {
        document.querySelector('.app-tag').remove();
        appNameLimit = 0;
    });
});

document.querySelectorAll('.start-menu img').forEach(app => {
    app.addEventListener('click', () => {
        switch (app.src.match(/(?<=img\/).+(?=\.png)/g)[0]) {
            case 'texteditor':
                appGui('notepad');
                break;
            case 'google':
                appGui('google');
                break;
            case 'calculator':
                appGui('calculator');
                break;
        }

        startMenu.isMenu = false;
        startMenu.menu.removeAttribute('style');
    });
});

document.querySelector('.lang').innerHTML = navigator.language;

function dateTime() {
    const time = new Date();

    const date = {
        hours: addZero(get12HourFormat(time.getHours())),
        minutes: addZero(time.getMinutes()),
        seconds: addZero(time.getSeconds()),
        day: addZero(time.getDate()),
        month: addZero(time.getMonth() + 1),
        year: time.getFullYear(),
        ampm: getAMPM(time.getHours())
    };

    document.querySelector('.hrs').innerHTML = date.hours;
    document.querySelector('.mins').innerHTML = date.minutes;
    document.querySelector('.month').innerHTML = date.month;
    document.querySelector('.day').innerHTML = date.day;
    document.querySelector('.yr').innerHTML = date.year;
    document.querySelector('.ampm').innerHTML = date.ampm;

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    function get12HourFormat(hours) {
        return hours % 12 || 12;
    }

    function getAMPM(hours) {
        return hours >= 12 ? 'PM' : 'AM';
    }
}

setInterval(dateTime, 1000);

document.querySelector('.themes').addEventListener('click', () => {
    const win = document.createElement('theme-manager');
    document.body.appendChild(win);

    startMenu.isMenu = false;
    startMenu.menu.removeAttribute('style');
});

class ThemeManager extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="header">
            <span>Theme Manager</span>
            <span><i class="fa-light fa-floppy-disk"></i>&nbsp;&nbsp;Apply</span>
            <span><i class="fa-light fa-xmark"></i></span>
        </div>
        <textarea spellcheck="false" placeholder="Write your CSS code here..."></textarea>
        `;
        setTimeout(() => this.style.opacity = 1);

        const textarea = this.querySelector('textarea');
        textarea.focus();

        document.body.style.pointerEvents = 'none';

        const style = document.createElement('style');
        document.head.appendChild(style);

        this.querySelector('.header span:nth-child(2)').addEventListener('click', () => {
            if (textarea.value != '') {
                style.innerHTML = textarea.value;
                localStorage.setItem('theme', textarea.value);
            } else {
                style.remove();
                localStorage.removeItem('theme');
            }
        });

        const completions = document.createElement('div');
        completions.classList.add('completions');
        document.body.appendChild(completions);

        completions.addEventListener('mousemove', () => {
            try {
                container.removeChild(selectionBox);
            } catch {
                return;
            }
        });

        const openingBrackets = ['(', '{', '[', '"', '\''];
        const closingBrackets = [')', '}', ']', '"', '\''];

        textarea.addEventListener('input', () => {
            const cursorPosition = textarea.selectionStart;

            const value = textarea.value;
            const currentLineStart = value.lastIndexOf('\n', cursorPosition - 1) + 1;
            const currentLine = value.substring(currentLineStart, cursorPosition);
            const searchString = currentLine.trim();

            if (searchString !== '') {
                fetch(`https://css-properties-api.darksidex37.repl.co/?search=${searchString}`)
                    .then(res => res.json())
                    .then(data => {
                        completions.innerHTML = '';

                        if (data.length > 0) {
                            completions.style.display = 'block';

                            for (let i = 0; i < data.length; i++) {
                                const elmnt = document.createElement('div');
                                elmnt.innerHTML = data[i];
                                completions.appendChild(elmnt);

                                elmnt.addEventListener('click', () => {
                                    textarea.value = value.substring(0, currentLineStart) + data[i] + value.substring(cursorPosition);
                                    textarea.setSelectionRange(cursorPosition + data[i].length - searchString.length, cursorPosition + data[i].length - searchString.length);
                                    completions.style.display = 'none';
                                    textarea.focus();
                                });
                            }
                        } else {
                            completions.style.display = 'none';
                        }
                    })
                    .catch(err => {
                        completions.innerHTML = `Error occurred:<br>${err}`;
                        completions.style.display = 'block';
                    });
            } else {
                completions.style.display = 'none';
            }
        });

        textarea.addEventListener('keydown', e => {
            const cursorPosition = textarea.selectionStart;

            if (openingBrackets.includes(e.key)) {
                e.preventDefault();
                textarea.value = textarea.value.slice(0, cursorPosition) + e.key + closingBrackets[openingBrackets.indexOf(e.key)] + textarea.value.slice(cursorPosition);
                textarea.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
            }
        });

        const closeBtn = this.querySelector('.header span:last-child');

        closeBtn.addEventListener('click', () => {
            this.style.opacity = 0;
            setTimeout(() => this.remove(), 200);
            document.body.removeAttribute('style');
            completions.remove();
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
            console.log(data);
            let description = data.weather[0].description;
            description = description.charAt(0).toUpperCase() + description.slice(1);

            document.querySelector('.name span').innerHTML = data.name;
            document.querySelector('.desc span').innerHTML = description;
            document.querySelector('.wind-speed span').innerHTML = data.wind.speed;
        });
});