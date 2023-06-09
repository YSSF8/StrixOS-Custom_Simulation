document.body.style.height = `${window.innerHeight - document.querySelector('.taskbar').offsetHeight}px`;
const bg = document.querySelector('.bg');

fetch('https://bingoapi.darksidex37.repl.co')
    .then(res => res.json())
    .then(data => {
        bg.src = data.url;
    });

function getUsername() {
    let username = prompt('Username (Optional, max 10 characters):', localStorage.getItem('username') == null ? '' : localStorage.getItem('username'));

    if (username == null) {
        return localStorage.getItem('username') ? localStorage.getItem('username') : 'Guest';
    }
    if (username.trim() == '') {
        return 'Guest';
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

document.addEventListener('click', e => {
    ctxMenu.style.transform = 'scale(0)';
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
    if (e.relatedTarget == null) {
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
                <textarea class="main" spellcheck="false"></textarea>
            </div>
        `;

        win.style.minWidth = '356px';

        const save = win.querySelector('#save');
        const load = win.querySelector('#load');
        const textarea = win.querySelector('textarea');

        setTimeout(() => textarea.focus(), 200);

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
                    <input type="text" class="calc-input" disabled>
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
                try {
                    document.querySelector('.body .op:last-child').click();
                } catch {
                    return;
                }
            }
        });
    } else if (app == 'terminal') {
        win.innerHTML = `
            <div class="header">
                <div class="flexible-title">
                    <img src="./img/terminal.png" height="20" width="20" alt="">
                    <div class="title">Terminal</div>
                </div>
                <div class="close"><i class="fa-light fa-xmark"></i></div>
            </div>
            <div class="body">
                <input type="text" placeholder="Type command here..." class="terminal-input">
                <div class="terminal-output"></div>
            </div>
        `;

        const terminalInput = win.querySelector('.body input');
        const terminalOutput = win.querySelector('.body .terminal-output');
        const title = win.querySelector('.title');

        setTimeout(() => terminalInput.focus(), 200);

        const commandHistory = [];
        let historyIndex = 0;

        terminalInput.addEventListener('keyup', e => {
            if (e.key == 'Enter') {

                if (terminalInput.value == '') {
                    return;
                }

                const command = terminalInput.value.trim();

                commandHistory.push(command);

                if (command == 'clear' || command == 'cls') {
                    terminalOutput.innerHTML = '';
                    terminalInput.value = '';
                    return;
                } else if (/^echo\s+(.*)$/gi.test(command)) {
                    const text = command.replace(/^echo\s+(.*)$/gi, '$1');
                    terminalOutput.innerHTML += `<div class="terminal-line">${text}</div>`;
                } else if (/^color\s+([a-zA-Z]+)$/gi.test(command)) {
                    const color = command.replace(/^color\s+([a-zA-Z]+)$/gi, '$1');
                    const nestedElements = terminalOutput.querySelectorAll('.terminal-line');

                    nestedElements.forEach(element => {
                        element.style.color = color;
                    });
                } else if (command == 'date') {
                    const date = new Date();
                    const hours = date.getHours();
                    let minutes = date.getMinutes();
                    const amPM = hours >= 12 ? 'PM' : 'AM';
                    const formattedHours = hours % 12 || 12;

                    minutes = minutes < 10 ? `0${minutes}` : minutes;

                    terminalOutput.innerHTML += `<div class="terminal-line">${formattedHours}:${minutes} ${amPM} ${date.toLocaleDateString()}</div>`;
                } else if (command == 'close' || command == 'exit' || command == 'quit') {
                    win.style.transform = 'translate(-50%, -50%) scale(0)';
                    setTimeout(() => closeBtn.parentElement.parentElement.remove(), 200);
                } else if (/^calc\s+(.*)$/gi.test(command)) {
                    const expression = command.replace(/^calc\s+(.*)$/gi, '$1');
                    try {
                        const result = eval(expression);
                        terminalOutput.innerHTML += `<div class="terminal-line">${expression} = ${result}</div>`;
                    } catch (error) {
                        terminalOutput.innerHTML += `<div class="terminal-line">Error: Invalid expression</div>`;
                    }
                } else if (command == 'restart') {
                    location.reload();
                } else if (/^open\s+(.*)$/gi.test(command)) {
                    const application = command.replace(/^open\s+(.*)$/gi, '$1');

                    terminalOutput.innerHTML += `<div class="terminal-line">Opening ${application}</div>`;

                    switch (application) {
                        case 'texteditor':
                        case 'notepad':
                            appGui('notepad');
                            break;
                        case 'google':
                            appGui('google');
                            break;
                        case 'calculator':
                            appGui('calculator');
                            break;
                        case 'cmd':
                        case 'terminal':
                            appGui('terminal');
                            break;
                        default:
                            terminalOutput.innerHTML += `<div class="terminal-line">Error: Invalid application</div>`;
                    }
                } else if (/^title\s+(.*)$/gi.test(command)) {
                    title.innerHTML = command.replace(/^title\s+(.*)$/gi, '$1').replace(/(?<=^.{20})(.*)/g, '');
                    terminalOutput.innerHTML += `<div class="terminal-line">Title changed to '${title.innerHTML}'</div>`;
                } else if (/^username\s+(.*)$/gi.test(command)) {
                    let newUsername = command.replace(/^username\s+(.*)$/gi, '$1').replace(/\s/g, '');
                    newUsername = newUsername.substring(0, 10);
                    localStorage.setItem('username', newUsername);
                    usernameLabel.innerHTML = newUsername;
                    terminalOutput.innerHTML += `<div class="terminal-line">Username changed to '${newUsername}'</div>`;
                } else if (command == 'thememgr') {
                    const themes = document.createElement('theme-manager');
                    document.body.appendChild(themes);
                    terminalOutput.innerHTML += `<div class="terminal-line">Theme Manager opened</div>`;
                } else if (command == 'kill') {
                    document.querySelectorAll('.window').forEach(window => {
                        window.style.transform = 'translate(-50%, -50%) scale(0)';
                        setTimeout(() => window.remove(), 200);
                    });
                } else if (/^copy\s+(.*)$/gi.test(command)) {
                    switch (command.replace(/^copy\s+(.*)$/gi, '$1')) {
                        case 'all':
                            navigator.clipboard.writeText(terminalOutput.innerText);
                            terminalOutput.innerHTML += `<div class="terminal-line">Terminal content copied to clipboard</div>`;
                            break;
                        case 'first':
                            navigator.clipboard.writeText(terminalOutput.firstElementChild.innerText);
                            terminalOutput.innerHTML += `<div class="terminal-line">First line copied to clipboard</div>`;
                            break;
                        case 'last':
                            navigator.clipboard.writeText(terminalOutput.lastElementChild.innerText);
                            terminalOutput.innerHTML += `<div class="terminal-line">Last line copied to clipboard</div>`;
                            break;
                        default:
                            terminalOutput.innerHTML += `<div class="terminal-line">Error: Invalid command</div>`;
                    }
                } else if (/^resize\s+(.*)$/gi.test(command)) {
                    const size = command.replace(/^resize\s+(.*)$/gi, '$1');

                    if (!size.includes('x')) {
                        terminalOutput.innerHTML += `<div class="terminal-line">Error: Invalid size</div>`;
                        terminalInput.value = '';
                        return;
                    }

                    const sizes = size.split('x');
                    win.style.width = `${sizes[0]}px`;
                    win.style.height = `${sizes[1]}px`;

                    terminalOutput.innerHTML += `<div class="terminal-line">Terminal resized to ${sizes[0]}x${sizes[1]}</div>`;
                } else if (/^closeable\s+(.*)$/gi.test(command)) {
                    const closeable = command.replace(/^closeable\s+(.*)$/gi, '$1');

                    if (closeable == 'false') {
                        closeBtn.style.pointerEvents = 'none';
                        terminalOutput.innerHTML += `<div class="terminal-line">Terminal is now not closeable</div>`;
                    } else if (closeable == 'true') {
                        closeBtn.style.pointerEvents = 'all';
                        terminalOutput.innerHTML += `<div class="terminal-line">Terminal is now closeable</div>`;
                    } else {
                        terminalOutput.innerHTML += `<div class="terminal-line">Error: Invalid value</div>`;
                    }
                } else if (/^font\s+(.*)$/gi.test(command)) {
                    const font = command.replace(/^font\s+(.*)$/gi, '$1');
                    const nestedElements = terminalOutput.querySelectorAll('.terminal-line');

                    nestedElements.forEach(element => {
                        element.style.fontFamily = font;
                    });

                    terminalOutput.innerHTML += `<div class="terminal-line">Changed font to '${font}'</div>`;
                } else if (command == 'history') {
                    if (commandHistory.length == 0) {
                        terminalOutput.innerHTML += `<div class="terminal-line">Command history is empty</div>`;
                    } else {
                        terminalOutput.innerHTML += `<div class="terminal-line"><b>Command History:</b></div>`;
                        commandHistory.forEach((cmd, index) => {
                            terminalOutput.innerHTML += `<div class="terminal-line">${index + 1}. ${cmd}</div>`;
                        });
                    }
                } else if (/^position/gi.test(command)) {
                    const position = command.replace(/^position\s+(.*)$/gi, '$1');

                    if (!position.includes('x')) {
                        terminalOutput.innerHTML += `<div class="terminal-line">Error: Invalid position</div>`;
                        terminalInput.value = '';
                        return;
                    }

                    const positions = position.split('x');
                    win.style.left = `${positions[0]}%`;
                    win.style.top = `${positions[1]}%`;

                    terminalOutput.innerHTML += `<div class="terminal-line">Terminal moved to ${positions[0]}x${positions[1]}</div>`;
                } else if (command == 'rerun') {
                    win.style.transform = 'translate(-50%, -50%) scale(0)';
                    setTimeout(() => {
                        win.remove();
                        appGui('terminal');
                    }, 200);
                } else if (/^get\s+(.*)$/gi.test(command)) {
                    const key = command.replace(/^get\s+(.*)$/gi, '$1');

                    switch (key) {
                        case 'username':
                            terminalOutput.innerHTML += `<div class="terminal-line">Username: ${localStorage.getItem('username')}</div>`;
                            break;
                        case 'background-url':
                            terminalOutput.innerHTML += `<div class="terminal-line">Background URL: ${bg.src}</div>`;
                            break;
                        case 'title':
                            terminalOutput.innerHTML += `<div class="terminal-line">Title: ${title.innerHTML}</div>`;
                            break;
                        case 'closeable':
                            if (closeBtn.style.pointerEvents == 'all') {
                                terminalOutput.innerHTML += `<div class="terminal-line">Closeable: true</div>`;
                            } else if (closeBtn.style.pointerEvents == 'none' || !closeBtn.style.pointerEvents) {
                                terminalOutput.innerHTML += `<div class="terminal-line">Closeable: false</div>`;
                            }
                            break;
                        case 'position':
                            terminalOutput.innerHTML += `<div class="terminal-line">Position: ${win.offsetLeft}x${win.offsetTop}</div>`;
                            break;
                        case 'size':
                            terminalOutput.innerHTML += `<div class="terminal-line">Size: ${win.offsetWidth}x${win.offsetHeight}</div>`;
                            break;
                        default:
                            terminalOutput.innerHTML += '<div class="terminal-line">Error: Invalid key</div>';
                    }
                } else if (command == 'load') {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    document.body.appendChild(fileInput);
                    terminalOutput.innerHTML += `<div class="terminal-line">Choosing file...</div>`;

                    fileInput.addEventListener('change', () => {
                        const file = fileInput.files[0];
                        const reader = new FileReader();

                        reader.addEventListener('load', () => {
                            const content = reader.result;

                            terminalOutput.innerHTML += `<div class="terminal-line terminal-snippet"></div>`;
                            const snippet = terminalOutput.querySelectorAll('.terminal-snippet');

                            snippet[snippet.length - 1].innerText = content;
                        });

                        reader.readAsText(file);
                        terminalOutput.innerHTML += `<div class="terminal-line">File Loaded '${file.name}'</div>`;
                    });

                    fileInput.click();
                    fileInput.remove();
                } else if (/^save\s+(.*)$/gi.test(command)) {
                    const value = command.replace(/^save\s+(.*)$/gi, '$1');

                    let blob;

                    switch (value) {
                        case 'all':
                            blob = new Blob([terminalOutput.innerText], { type: 'text/plain' });
                            const a = document.createElement('a');
                            a.href = URL.createObjectURL(blob);
                            a.download = 'all.txt';
                            a.click();
                            a.remove();
                            terminalOutput.innerHTML += `<div class="terminal-line">File Saved as '${a.download}'</div>`;
                            break;
                        case 'first':
                            blob = new Blob([terminalOutput.firstElementChild.innerText], { type: 'text/plain' });
                            const b = document.createElement('a');
                            b.href = URL.createObjectURL(blob);
                            b.download = 'first.txt';
                            b.click();
                            b.remove();
                            terminalOutput.innerHTML += `<div class="terminal-line">File Saved as '${b.download}'</div>`;
                            break;
                        case 'last':
                            blob = new Blob([terminalOutput.lastElementChild.innerText], { type: 'text/plain' });
                            const c = document.createElement('a');
                            c.href = URL.createObjectURL(blob);
                            c.download = 'last.txt';
                            c.click();
                            c.remove();
                            terminalOutput.innerHTML += `<div class="terminal-line">File Saved as '${c.download}'</div>`;
                            break;
                        default:
                            terminalOutput.innerHTML += `<div class="terminal-line">Error: Invalid value</div>`;
                    }

                    URL.revokeObjectURL(blob);
                } else if (/^github\s+(.*)$/gi.test(command)) {
                    const username = command.replace(/^github\s+(.*)$/gi, '$1');

                    fetch(`https://api.github.com/users/${username}`)
                        .then(res => res.json())
                        .then(data => {
                            terminalOutput.innerHTML += `<div class="terminal-line terminal-snippet"><pre>${JSON.stringify(data, null, 4)}</pre></div>`;
                            terminalOutput.innerHTML = terminalOutput.innerHTML.replace(/"(.*)":\s+"(.*)"/g, '<span class="terminal-var">"$1"</span><span>: </span><span class="terminal-val">"$2"</span>');
                            terminalOutput.innerHTML = terminalOutput.innerHTML.replace(/"(.*)":\s+(\d+)/g, '<span class="terminal-var">"$1"</span><span>: </span><span class="terminal-num">$2</span>');
                            terminalOutput.innerHTML = terminalOutput.innerHTML.replace(/"(.*)":\s+((?!"|\s).*)(?=,)/g, '<span class="terminal-var">"$1"</span><span>: </span><span class="terminal-other">$2</span>');

                            terminalOutput.scrollTop = terminalOutput.scrollHeight;
                        })
                        .catch(err => {
                            terminalOutput.innerHTML += `<div class="terminal-line">Error: ${err}</div>`;
                        });
                } else if (/^rename\s+(.*)$/gi.test(command)) {
                    const name = command.replace(/^rename\s+(.*)$/gi, '$1');
                    const splitted = name.split(' ');

                    const firstTitle = splitted[0];
                    const secondTitle = splitted[1];

                    if (splitted.length > 2) {
                        terminalOutput.innerHTML += '<div class="terminal-line">Error: Too many arguments</div>';
                        terminalInput.value = '';
                        return;
                    }

                    let matchFound = false;
                    let titleExists = false;

                    document.querySelectorAll('.app-sort .app').forEach(app => {
                        const appTitle = app.querySelector('div');

                        if (appTitle.innerText.trim() == firstTitle.trim()) {
                            matchFound = true;
                        }

                        if (appTitle.innerText.trim() == secondTitle.trim()) {
                            titleExists = true;
                        }
                    });

                    if (matchFound) {
                        if (titleExists) {
                            terminalOutput.innerHTML += `<div class="terminal-line">Error: Title already exists</div>`;
                        } else {
                            document.querySelectorAll('.app-sort .app').forEach(app => {
                                const appTitle = app.querySelector('div');

                                if (appTitle.innerText.trim() == firstTitle.trim()) {
                                    appTitle.innerText = secondTitle;
                                }
                            });

                            terminalOutput.innerHTML += `<div class="terminal-line">Rename '${firstTitle}' to '${secondTitle}' successfully</div>`;
                        }
                    } else {
                        terminalOutput.innerHTML += `<div class="terminal-line">Error: Title not found</div>`;
                    }
                } else if (/^clone\s+(.*)$/gi.test(command)) {
                    const regex = /^clone\s+(.*?)\s+(.*?)$/i;
                    const matches = command.match(regex);

                    if (matches && matches.length == 3) {
                        const firstTitle = matches[1];
                        const secondTitle = matches[2];

                        const appSort = document.querySelector('.app-sort');
                        const apps = appSort.querySelectorAll('.app');

                        const existingApp = Array.from(apps).find(app => {
                            const title = app.querySelector('div');
                            return title.innerText.trim() == secondTitle;
                        });

                        if (existingApp) {
                            terminalOutput.innerHTML += `<div class="terminal-line">Error: Title already exists</div>`;
                        } else {
                            apps.forEach(app => {
                                const title = app.querySelector('div');
                                const appTitle = title.innerText.trim();

                                if (appTitle == firstTitle) {
                                    const clonedApp = app.cloneNode(true);
                                    const clonedTitle = clonedApp.querySelector('div');
                                    clonedTitle.innerText = secondTitle;
                                    clonedApp.classList.add('app', secondTitle);
                                    appSort.appendChild(clonedApp);

                                    terminalOutput.innerHTML += `<div class="terminal-line">Successfully cloned '${firstTitle}' as '${secondTitle}'</div>`;
                                }
                            });
                        }
                    } else {
                        terminalOutput.innerHTML += `<div class="terminal-line">Invalid command. Usage: clone [existingAppName] [newAppName]</div>`;
                    }
                } else if (/^delete/gi.test(command)) {
                    const appName = command.replace(/^delete\s+(.*)$/gi, '$1');

                    document.querySelectorAll('.app-sort .app').forEach(app => {
                        if (app.querySelector('div').innerText.trim().toLowerCase() == appName.toLowerCase()) {
                            app.remove();
                        }
                    });

                    let isError = false;

                    document.querySelectorAll('.taskbar img').forEach(app => {
                        const regex = app.src.match(/(?<=img\/)(.*?)(?=\.png)/gi)[0];

                        if (regex.toLowerCase() == 'logo') {
                            isError = true;
                            return;
                        }

                        if (regex.toLowerCase() == appName.toLowerCase()) {
                            app.remove();
                        } else {
                            isError = true;
                        }

                        if (regex.toLowerCase() == 'texteditor' && appName.toLowerCase() == 'notepad') {
                            app.remove();
                        }
                    });

                    if (isError) {
                        terminalOutput.innerHTML += '<div class="terminal-line">Error: App not found</div>';
                    }

                    document.querySelectorAll('.start-menu img').forEach(app => {
                        const regex = app.src.match(/(?<=img\/)(.*?)(?=\.png)/gi)[0];

                        if (regex.toLowerCase() == appName.toLowerCase()) {
                            app.remove();
                        }
                        if (regex.toLowerCase() == 'texteditor' && appName.toLowerCase() == 'notepad') {
                            app.remove();
                        }
                    });
                } else if (/^math\s+(.*)$/gi.test(command)) {
                    const expression = command.replace(/^math\s+(.*)$/gi, '$1');
                    const splitted = expression.split(' ');

                    const first = splitted[0];
                    const second = parseFloat(splitted[1]);

                    switch (first) {
                        case 'fact':
                            terminalOutput.innerHTML += `<div class="terminal-line">Factorial of ${second} is '${Math.fact(second)}'</div>`;
                            break;
                        case 'pow':
                            const result = Math.pow(parseFloat(second), parseFloat(splitted[2]));
                            terminalOutput.innerHTML += `<div class="terminal-line">Power of ${second}, ${splitted[2]} is '${result}'</div>`;
                            break;
                        case 'sqrt':
                            terminalOutput.innerHTML += `<div class="terminal-line">Square root of ${second} is '${Math.sqrt(second)}'</div>`;
                            break;
                        case 'floor':
                            terminalOutput.innerHTML += `<div class="terminal-line">Floor of ${second} is '${Math.floor(second)}'</div>`;
                            break;
                        case 'abs':
                            terminalOutput.innerHTML += `<div class="terminal-line">Absolute value of ${second} is '${Math.abs(second)}'</div>`;
                            break;
                        case 'min':
                            const minNumbers = splitted.slice(1).map(parseFloat);
                            const minResult = Math.min(...minNumbers);
                            terminalOutput.innerHTML += `<div class="terminal-line">Minimum value from the given numbers is '${minResult}'</div>`;
                            break;
                        case 'max':
                            const maxNumbers = splitted.slice(1).map(parseFloat);
                            const maxResult = Math.max(...maxNumbers);
                            terminalOutput.innerHTML += `<div class="terminal-line">Maximum value from the given numbers is '${maxResult}'</div>`;
                            break;
                        default:
                            terminalOutput.innerHTML += `<div class="terminal-line">Error: Invalid math command</div>`;
                    }
                } else if (/^devtools(.*)$/gi.test(command)) {
                    const tool = command.replace(/^devtools(.*)$/gi, '$1');
                    const trimmed = tool.trim();

                    const config = {
                        width: 600,
                        height: 700
                    }

                    config.top = (screen.height - config.height) / 2;
                    config.left = (screen.width - config.width) / 2;

                    if (!/(html|scss|css|js)/gi.test(trimmed.toLowerCase())) {
                        terminalOutput.innerHTML += '<div class="terminal-line">Error: Invalid devtools tool</div>';
                        terminalInput.value = '';
                        return;
                    }

                    window.open(`devtools/${trimmed}.html`, '_blank', `width=${config.width},height=${config.height},top=${config.top},left=${config.left}`);
                    terminalOutput.innerHTML += `<div class="terminal-line">Successfully opened devtools for '${tool.toLowerCase()}'</div>`;
                } else if (command == 'execjs') {
                    window.open('execjs.html', '_blank', `width=${screen.width},height=${screen.height},top=0,left=0`);
                } else if (command == 'help') {
                    terminalOutput.innerHTML += `
                        <div class="terminal-line"><b>Help list</b></div>
                        <div class="terminal-line">clear/cls - clear the terminal</div>
                        <div class="terminal-line">echo &lt;text&gt; - print text</div>
                        <div class="terminal-line">color &lt;color&gt; - change text color</div>
                        <div class="terminal-line">date - print current date</div>
                        <div class="terminal-line">close/exit/quit - close the terminal</div>
                        <div class="terminal-line">calc &lt;expression&gt; - calculate an expression</div>
                        <div class="terminal-line">restart - restart the OS</div>
                        <div class="terminal-line">open &lt;application&gt; - open an application</div>
                        <div class="terminal-line">title &lt;title&gt; - change the title of the terminal (Max length: 20 characters)</div>
                        <div class="terminal-line">username &lt;username&gt; - change the username (Max length: 10 characters)</div>
                        <div class="terminal-line">thememgr - open the theme manager</div>
                        <div class="terminal-line">kill - close all windows</div>
                        <div class="terminal-line">copy &lt;all/first/last&gt; - copy the terminal content to the clipboard</div>
                        <div class="terminal-line">resize &lt;widthxheight&gt; - resize the terminal</div>
                        <div class="terminal-line">closeable &lt;true/false&gt; - make the terminal closeable</div>
                        <div class="terminal-line">font &lt;font&gt; - change the font of the terminal</div>
                        <div class="terminal-line">history - print the command history</div>
                        <div class="terminal-line">position &lt;xposxypos&gt; - move the terminal to a specific position</div>
                        <div class="terminal-line">rerun - restart the terminal</div>
                        <div class="terminal-line">get &lt;key&gt; - get a value from the terminal</div>
                        <div class="terminal-line">load - load a file from the disk</div>
                        <div class="terminal-line">save &lt;all/first/last&gt; - save the terminal content to the disk</div>
                        <div class="terminal-line">github &lt;username&gt; - get information about a github user</div>
                        <div class="terminal-line">rename &lt;old title&gt; &lt;new title&gt; - rename an application</div>
                        <div class="terminal-line">clone &lt;existing title&gt; &lt;new title&gt; - clone an application</div>
                        <div class="terminal-line">delete &lt;application title&gt; - delete an application</div>
                        <div class="terminal-line">math &lt;math command&gt; - perform a math operation</div>
                        <div class="terminal-line">devtools &lt;tool&gt; - open the developer tools</div>
                        <div class="terminal-line">execjs - open the execjs tool</div>
                        <div class="terminal-line">help - print this list</div>
                    `;
                } else {
                    terminalOutput.innerHTML += `<div class="terminal-line">'${command}' is not recognized as an internal or external command, operable program, or batch file.</div>`;
                }

                terminalInput.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            } else if (e.key == 'ArrowUp') {
                e.preventDefault();
                if (historyIndex < commandHistory.length) {
                    historyIndex++;
                }
                terminalInput.value = commandHistory[commandHistory.length - historyIndex] || '';
            } else if (e.key == 'ArrowDown') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                }
                terminalInput.value = commandHistory[commandHistory.length - historyIndex] || '';
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
        switch (app.className.match(/(?<=app\s+).+/g)[0]) {
            case 'notepad':
                appGui('notepad');
                break;
            case 'google':
                appGui('google');
                break;
            case 'calc':
                appGui('calculator');
                break;
            case 'terminal':
                appGui('terminal');
                break;
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
            case 'terminal':
                appGui('terminal');
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
            case 'terminal':
                appGui('terminal');
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
        hours: get12HourFormat(time.getHours()),
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

const weather = {
    name: document.querySelector('.name span'),
    desc: document.querySelector('.desc span'),
    wind: document.querySelector('.wind-speed span')
}

navigator.geolocation.getCurrentPosition(pos => {
    let latitude = pos.coords.latitude,
        longitude = pos.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=50a7aa80fa492fa92e874d23ad061374`)
        .then(res => res.json())
        .then(data => {
            let description = data.weather[0].description;
            description = description.charAt(0).toUpperCase() + description.slice(1);

            weather.name.innerHTML = data.name;
            weather.desc.innerHTML = description;
            weather.wind.innerHTML = data.wind.speed;
        });
}, error => {
    let err = error.message.replace('User ', '').split(' ').reverse().join(' ');

    weather.name.innerHTML = err;
    weather.desc.innerHTML = err;
    weather.wind.innerHTML = err;
});