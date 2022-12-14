export { notice, alert, prompt, Movement, randomPosition, toPointer, Random, notification, Counter, Create, µ, HoverEffx, position, FocusEffx }

// Links with the CSS
const css = document.createElement('link');
css.rel = 'stylesheet';
css.href = 'xorio.css';
document.head.appendChild(css);

// Shows up a notification
function notice(message) {
    const el = document.createElement('div');
    el.innerText = message;
    el.classList.add('xorio-notice');
    document.body.appendChild(el);

    // Appearing transition
    setTimeout(() => {
        el.style.opacity = 1;
        el.style.bottom = '10%';
    });

    // Disapearing
    setTimeout(() => {
        // Transition
        el.style.opacity = 0;
        el.style.bottom = '12%';
        // Removing the element
        setTimeout(() => {
            el.remove();
        }, 200);
    }, 1000);
}

let boxes = false; // A boolean to stop multiple boxes

// Custom alert box
function alert(message, button_text) {
    const el = document.createElement('div');
    el.innerHTML = `<h3 class="xorio-alert-title">"${document.title}" says</h3><div class="xorio-alert-message">${message}</div>`;
    el.classList.add('xorio-alert');
    document.body.appendChild(el);

    const btn = document.createElement('button');
    btn.innerText = button_text;
    btn.classList.add('xorio-alert-btn');
    el.appendChild(btn);

    if (btn.innerText == 'undefined' || btn.innerText == '') {
        btn.innerText = 'OK';
    }

    setTimeout(() => {
        el.style.top = '50%';
        el.style.opacity = 1;
        document.body.style.pointerEvents = 'none';
        boxes = true;
    });

    if (boxes == true) {
        el.remove();
    }

    btn.addEventListener('click', () => {
        el.style.top = '47%';
        el.style.opacity = 0;
        setTimeout(() => {
            el.remove();
            document.body.removeAttribute('style');
            boxes = false;
        }, 200);
    });
}

// Custom prompt box
function prompt(message, placeholder, button_text) {
    // The body
    const el = document.createElement('div');
    el.innerHTML = `<h3 class="xorio-prompt-title">"${document.title}" says</h3><div class="xorio-prompt-message">${message}</div>`;
    el.classList.add('xorio-prompt');
    document.body.appendChild(el);

    // The text input
    const input = document.createElement('input');
    input.placeholder = placeholder;
    input.classList.add('xorio-prompt-input');
    el.appendChild(input);

    // The OK button
    const btn = document.createElement('button');
    btn.innerText = button_text;
    btn.classList.add('xorio-prompt-btn');
    el.appendChild(btn);

    // If the placeholder is null it will return nothing
    if (input.placeholder == 'undefined') {
        input.placeholder = '';
    }

    // If the button text is null it will return "OK"
    if (btn.innerText == 'undefined' || btn.innerText == '') {
        btn.innerText = 'OK';
    }

    // Appearing transition
    setTimeout(() => {
        el.style.top = '50%';
        el.style.opacity = 1;
        document.body.style.pointerEvents = 'none';
        boxes = true;
    });

    if (boxes == true) {
        el.remove();
    }

    btn.addEventListener('click', () => {
        el.style.top = '47%';
        el.style.opacity = 0;
        setTimeout(() => {
            el.remove();
            document.body.removeAttribute('style');
            boxes = false;
        }, 200);
    });
}

// Makes the element moves using keys
class Movement {
    // Moves with arrow keys
    arrows(element) {
        const el = document.querySelector(element);
        el.style.position = 'fixed';
        el.style.transition = 'left 50ms, top 50ms';
        let x = 0, y = 0;

        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowRight':
                    x += 10;
                    el.style.left = x + 'px';
                    break;
                case 'ArrowLeft':
                    x -= 10;
                    el.style.left = x + 'px';
                    break;
                case 'ArrowUp':
                    y -= 10;
                    el.style.top = y + 'px';
                    break;
                case 'ArrowDown':
                    y += 10;
                    el.style.top = y + 'px';
                    break;
            }
        });
    }
    // Moves with WASD keys
    WASD(element) {
        const el = document.querySelector(element);
        el.style.position = 'fixed';
        el.style.transition = 'left 50ms, top 50ms';
        let x = 0, y = 0;

        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'd':
                    x += 10;
                    el.style.left = x + 'px';
                    break;
                case 'a':
                    x -= 10;
                    el.style.left = x + 'px';
                    break;
                case 'w':
                    y -= 10;
                    el.style.top = y + 'px';
                    break;
                case 's':
                    y += 10;
                    el.style.top = y + 'px';
                    break;
            }
        });
    }
    // Moves with Arrow/WASD keys
    both(element) {
        const el = document.querySelector(element);
        el.style.position = 'fixed';
        el.style.transition = 'left 50ms, top 50ms';
        let x = 0, y = 0;

        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowRight':
                case 'd':
                    x += 10;
                    el.style.left = x + 'px';
                    break;
                case 'ArrowLeft':
                case 'a':
                    x -= 10;
                    el.style.left = x + 'px';
                    break;
                case 'ArrowUp':
                case 'w':
                    y -= 10;
                    el.style.top = y + 'px';
                    break;
                case 'ArrowDown':
                case 's':
                    y += 10;
                    el.style.top = y + 'px';
                    break;
            }
        });
    }
}

// Makes the selected element go to a random position
function randomPosition(element) {
    const el = document.querySelector(element);
    el.style.position = 'fixed';
    el.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
    el.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
}

// Makes the selected element follows the cursor
function toPointer(element) {
    const el = document.querySelector(element);
    el.style.position = 'fixed';

    addEventListener('mousemove', e => {
        el.style.left = e.clientX + 'px';
        el.style.top = e.clientY + 'px';
    });
}

// Random things
class Random {
    constructor() {
        this.number = this.number;
        this.letter = Math.floor(Math.random() * (122 - 97 + 1) + 97);
    }

    // Gives a random letter
    string() {
        this.letter = String.fromCharCode(this.letter);
    }
    // Gives a random number
    int(limit) {
        this.number = Math.floor(Math.random() * limit);
    }
}

let notifs = false; // A boolean to limit notifications

// A notification
function notification(title, message) {
    // The body
    const el = document.createElement('div');
    el.innerHTML = `<h3 class="xorio-notification-title">${title}</h3>`;
    el.classList.add('xorio-notification');
    document.body.appendChild(el);

    // The message content
    const msg = document.createElement('div');
    msg.innerText = message;
    msg.classList.add('xorio-notification-message');
    el.appendChild(msg);

    // The remove button
    const btn = document.createElement('div');
    btn.classList.add('xorio-notification-close');
    el.appendChild(btn);

    // Appearing transition
    setTimeout(() => {
        notifs = true;
        el.style.right = '10px';
    });

    // Removes the clones of the notifications
    if (notifs == true) {
        el.remove();
    }

    // Transition after clicking the remove button
    btn.addEventListener('click', () => {
        el.style.right = '-100%';
        setTimeout(() => {
            el.remove();
            notifs = false;
        }, 200);
    });
}

// Creates an invisible counter
class Counter {
    constructor() {
        this.value = 0;
    }

    // Counts up
    countUp(milliseconds) {
        setInterval(() => {
            this.value++;
        }, milliseconds);
    }
    // Counts down
    countDown(milliseconds) {
        setInterval(() => {
            this.value--;
        }, milliseconds);
    }
}

// Creates a new object
class Create {
    constructor() {
        this.placeholder = '';
        this.value = '';
    }

    // Element creation
    element(tag_name, class_name, id, text, parent) {
        const el = document.createElement(tag_name);
        el.className = class_name;
        el.id = id;
        el.innerHTML = text;
        el.style.fontFamily = '\'Ubuntu\', sans-serif';
        el.placeholder = this.placeholder;
        el.value = this.value;
        document.querySelector(parent).appendChild(el);
    }
}

// Some JQuery features
function µ(selector) {
    let element = document.querySelector(selector);
    const self = {
        html: () => element,
        on: (event, callback) => {
            element.addEventListener(event, callback);
        },
        remove: () => element.remove(),
        hide: () => {
            element.style.display = 'none';
        },
        addClass: (class_name) => {
            element.classList.add(class_name);
        },
        attr: (name, value) => {
            if (value == null) {
                element.getAttribute(name);
            } else {
                element.setAttribute(name, value);
            }
        },
        style: (property, result) => {
            element.setAttribute('style', `${property}: ${result}`);
        },
        setHTML: (markup) => {
            element.innerHTML = markup;
        },
        setText: (text) => {
            element.innerText = text;
        },
        appendChild: (selector) => {
            element.appendChild(selector);
        },
        align: (position) => {
            element.align = position;

            if (element.align == 'undefined' || element.align == '') {
                element.align = 'left';
            }
        },
        addHTML: (markup) => {
            element.innerHTML += markup;
        },
        addText: (text) => {
            element.innerText += text;
        },
        draggable: (boolean) => {
            element.draggable = boolean;
        },
        clone: (parent) => {
            const cloned = element.cloneNode(true);
            document.querySelector(parent).appendChild(cloned);
        }
    }
    return self;
}

// Cool hover effects
class HoverEffx {
    // Shaking effect
    shake(selector) {
        const el = document.querySelectorAll(selector);
        el.forEach(element => {
            element.classList.add('xorio-hover-shake');
        });
    }
    // Vibration effect
    vibration(selector) {
        const el = document.querySelectorAll(selector);
        el.forEach(element => {
            element.classList.add('xorio-hover-vib');
        });
    }
    // Box effect
    box(selector) {
        const el = document.querySelectorAll(selector);
        el.forEach(element => {
            element.classList.add('xorio-hover-box');
        });
    }
}

// This function controls the position of the elements
function position(selector) {
    const el = document.querySelector(selector);
    const self = {
        // Makes the selected element go to a random position
        random: () => {
            el.style.position = 'fixed';
            el.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
            el.style.top = Math.floor(Math.random() * window.innerHeight) + 'px';
        },
        // Makes the selected element follows the pointer
        followPointer: () => {
            el.style.position = 'fixed';
            el.style.pointerEvents = 'none';
            document.addEventListener('mousemove', ({ clientX, clientY }) => {
                let x = clientX, y = clientY;
                el.style.left = x + 'px';
                el.style.top = y + 'px';
            });
        },
        // Makes the selected element moves with keyboard keys
        movement: () => {
            el.style.position = 'fixed';
            el.style.transition = 'left 50ms, top 50ms';
            let x = 0, y = 0;

            const keys = {
                // Moves with the arrow keys
                arrows: () => {
                    document.addEventListener('keydown', e => {
                        switch (e.key) {
                            case 'ArrowRight':
                                x += 10;
                                el.style.left = x + 'px';
                                break;
                            case 'ArrowLeft':
                                x -= 10;
                                el.style.left = x + 'px';
                                break;
                            case 'ArrowUp':
                                y -= 10;
                                el.style.top = y + 'px';
                                break;
                            case 'ArrowDown':
                                y += 10;
                                el.style.top = y + 'px';
                                break;
                        }
                    });
                },
                // Moves with the WASD keys
                wasd: () => {
                    document.addEventListener('keydown', e => {
                        switch (e.key) {
                            case 'd':
                                x += 10;
                                el.style.left = x + 'px';
                                break;
                            case 'a':
                                x -= 10;
                                el.style.left = x + 'px';
                                break;
                            case 'w':
                                y -= 10;
                                el.style.top = y + 'px';
                                break;
                            case 's':
                                y += 10;
                                el.style.top = y + 'px';
                                break;
                        }
                    });
                },
                // Moves with arrow/WASD keys
                both: () => {
                    document.addEventListener('keydown', e => {
                        switch (e.key) {
                            case 'ArrowRight':
                            case 'd':
                                x += 10;
                                el.style.left = x + 'px';
                                break;
                            case 'ArrowLeft':
                            case 'a':
                                x -= 10;
                                el.style.left = x + 'px';
                                break;
                            case 'ArrowUp':
                            case 'w':
                                y -= 10;
                                el.style.top = y + 'px';
                                break;
                            case 'ArrowDown':
                            case 's':
                                y += 10;
                                el.style.top = y + 'px';
                                break;
                        }
                    });
                }
            }
            return keys;
        }
    }
    return self;
}

// Cool focus effects
class FocusEffx {
    constructor(selector) {
        this.selector = selector;
    }

    // Makes a shadow effect after clicking the selected elements
    shadow(range, color, ms) {
        const el = document.querySelectorAll(this.selector);

        // Loops through the selected elements so every element will be affected
        el.forEach(elem => {
            elem.classList.add('xorio-focus-shadow');
    
            const style = document.createElement('style');
            style.innerHTML = `
                .xorio-focus-shadow {
                    transition: box-shadow ${ms}ms;
                }
                .xorio-focus-shadow:focus {
                    box-shadow: 0 0 0 ${range}px ${color};
                }
            `;
            document.head.appendChild(style);
        });
    }
    // Changes the background color of the selected elements
    changeBackgroundColor(color, ms) {
        const el = document.querySelectorAll(this.selector);

        // Loops through the selected elements so every element will be affected
        el.forEach(elem => {
            elem.classList.add('xorio-focus-change_color');

            const style = document.createElement('style');
            style.innerHTML = `
                .xorio-focus-change_color {
                    transition: background ${ms}ms;
                }
                .xorio-focus-change_color:focus {
                    background-color: ${color};
                }
            `;
            document.head.appendChild(style);
        });
    }
}