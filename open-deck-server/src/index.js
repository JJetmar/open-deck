// Move the mouse across the screen as a sine wave.
const robot = require("robotjs");
const express = require('express');
const appVersion = require('../package').version;
const path = require('path');

console.log(`   ______
 /|      |
/ | OPEN |
| | DECK |
| |______|
|/______/  version: ${appVersion}\n`);

const { port, buttons, background, buttonStyles } = require('./configuration.js');

const app = express();

app.use(express.static(path.resolve(__dirname, '../public/')));

app.get('/configuration', (req, res) => {

    const result = {
        buttonStyles,
        background,
        buttons: []
    };

    buttons.forEach((button, index) => {
        const { title, name, text, icon, style } = button;

        result.buttons.push({
            name: name || `button-${index}`,
            icon,
            title,
            text,
            style
        });
    });

    res.json(result);
})

buttons.forEach((button, index) => {
    /* TODO USE POST*/
    const buttonName = button.name || `button-${index}`;

    robot.setKeyboardDelay(1);
    app.get(`/press-button/${buttonName}`, (req, res) => {
        const pressedKeys = new Set();
        button.binds.forEach(keyWrapper => {
            const { key, event } = keyWrapper;
            switch (event) {
                case "down":
                    robot.keyToggle(key, event);
                    pressedKeys.add(key);
                    break;
                case "up":
                    robot.keyToggle(key, event);
                    pressedKeys.delete(key);
                    break;
                case "tap":
                case null:
                case undefined:
                    robot.keyTap(key);
                    break;
                default:
                    console.error(`Unknown event "${event}".`)
            }
        });

        // Release pressed keys (if forgotten)
        pressedKeys.forEach(key => {
            robot.keyToggle(key, "up");
        });

        const keys = button.binds.map(keyWrapper => {
            let arrow = "";
            switch (keyWrapper.event) {
                case "down": arrow = "↓"; break;
                case "up": arrow = "↑"; break;
                case "tap": arrow = "↓↑"; break;
            }
            return `${arrow}[${keyWrapper.key}]`;
        });

        console.log("Triggered " + keys.join(", ") + " via " + req.url);

        res.json({
            pressedKeys: button.binds
        });
    })
});

app.listen(port, () => {
    console.log(`Open-deck is up and running on http://localhost:${port}\n`);
});

process.stdin.resume();