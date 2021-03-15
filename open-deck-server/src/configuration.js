const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIGURATION = require("./default-configuration.json");

// User configuration
let configUserPath;
if (process.pkg) {
    configUserPath = path.resolve(path.dirname(process.argv0), "open-deck.json");
} else {
    configUserPath = path.resolve("", "open-deck.json");
}

let userConfiguration;
try {
    userConfiguration = JSON.parse(fs.readFileSync(configUserPath, "utf-8"));
} catch (e) {
    switch (e.code) {
        case "ENOENT":
            console.log("User configuration was not found.");
            fs.writeFileSync(configUserPath, JSON.stringify(DEFAULT_CONFIGURATION, null, 2));
            console.log(`New configuration file created at path "${configUserPath}".`);
            break;
        default:
            console.error("User configuration could not be processed.", e);
    }

    userConfiguration = {};
}

const configuration = Object.assign({}, DEFAULT_CONFIGURATION, userConfiguration);

module.exports = configuration;