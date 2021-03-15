import 'whatwg-fetch'
// Unminified version does not work on older devices (like iPhone 4s)
import NoSleep from 'nosleep.js/dist/NoSleep.min';

const noSleep = new NoSleep();

const renderButton = (button) => {
    const { name, icon, title, text, style, onclick } = button;

    const newButton = document.createElement("button");

    const buttonId = "btn-" + name;
    newButton.name = name;
    newButton.id = buttonId;
    if (title != null) newButton.title = title;
    newButton.innerHTML = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" style="background-image: url(${icon})" />`;
    if (text != null) newButton.innerHTML+= `<label for="${buttonId}"/>${text}</label>`;
    if (onclick != null) newButton.onclick = onclick;

    Object.assign(newButton.style, style);

    return newButton
}

const loadConfiguration = () => {
    const buttonsEl = document.getElementById("buttons");
    buttonsEl.innerHTML = "";

    fetch("/configuration")
        .then(response => response.json())
        .then(data => {
            const { buttons, background } = data;

            if (background != null) document.body.style.backgroundImage = `url(${background})`;

            buttons.forEach(button => {
                buttonsEl.appendChild(renderButton({
                    ...button,
                    onclick: () => {
                        const { name } = button;
                        fetch(`/press-button/${name}`)
                            .then(response => response.json())
                            .then(data => {
                                const keys = data.pressedKeys.map(pressedKeys => pressedKeys.key);
                                console.log(`Called ${name}. Simulation of pressing keys: [${keys.join("] + [")}] on host.`)
                            })
                    }
                }));
            });

            // Keep screen light on button
            const screenOnButton = renderButton({
                style: {
                    background: "lightgray"
                },
                name: "keepScreenOn",
                title: "Keep screen light on.",
                icon: "http://simpleicon.com/wp-content/uploads/light-bulb-7.svg"
            });
            screenOnButton.onclick = () => {
                if (noSleep.isEnabled) {
                    noSleep.disable();
                    screenOnButton.style.background = "lightgray"
                } else {
                    noSleep.enable();
                    screenOnButton.style.background = "rgb(0, 255, 0)"
                }

            }
            buttonsEl.appendChild(screenOnButton);
        });
};

try {
    loadConfiguration();

    // Detecting capability of local storage
    localStorage.setItem("key", "value");
} catch (e) {
    // fallback display error in older browsers
    document.write(JSON.stringify(e, null, 2));
}
