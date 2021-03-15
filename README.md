# Open-Deck
Solution for remote keypress control via web interface.

## Proof of concept
This project is currently in alpha version. More investigation about its usage and requirements for development
have to be done.

## Download and run
The easiest way is to simple run binaries that can be downloaded in [Releases](https://github.com/JJetmar/open-deck/releases/) section.
These binaries include Node.js runtime environment and all necessary requirements for running - this is a reason why the size of executable
file is over 15 MB.

The first run of Open-Deck can take some time (less than a1 minute) while you can see only blank command line that do not close itself.

After running Open-Deck it tells **local address** and **port** where the application is running.
To access it from remote devices please pay attention that you need to address your host with its ip address.
To find host ip address u can use command ipconfig (in command line):
```
ipconfig /all
```
You are looking for one of the lines similiar to:
```
IPv4 Address. . . . . . . . . . . : 192.168.0.108(Preferred)
```
this means that you need use uri ```http://192.168.0.108:48888``` *(48888 is default port)* on your remote device to access the Open-Deck web interface.
Also, both host and remote devices have to be connected to the same network. 

### Configuration
On the first run of Open-Deck a configuration file **open-deck.json** is created (next to the executed file).
This file contains configuration for Open-Deck. In cases of changes, Open-Deck should be restarted to .

```json
{
  "port": 48888,
  "background": "https://cdn.pling.com/img/e/5/d/a/8e4b1a99e3152ea8ad0574ed875e29708b543075c97948e02b76e877255615861641.jpg",
  "buttons": [
    {
      "icon": "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/svgs/solid/keyboard.svg",
      "text": "Hello world",
      "title": "Type hello world!",
      "style": {
        "background": "#ff0000"
      },
      "binds": [
        { "key": "h", "event": "tap" },
        { "key": "e", "event": "tap" },
        { "key": "l", "event": "tap" },
        { "key": "l", "event": "tap" },
        { "key": "o", "event": "tap" }
      ]
    }
  ]
}
```
- **port**&ast;: The port where application would be running.
- **background**: URI to image that will be used for a background.
- **buttons**: Sequence of user custom action buttons.
  - **style**: Custom css styles for given button (see Style [Object Properties](https://www.w3schools.com/jsref/dom_obj_style.asp))
  - **icon**: URI to the image file that will be used as a button icon.
  - **binds**&ast;: Sequence of key events that will be performed on host PC, after given button is used.
    - **key**: Name of the key that should be binded (see [valid key codes](http://robotjs.io/docs/syntax#keys)) 
    - **event**: Represents a way of binded interaction with a button:
      - **down**: Key is pressed (and holded).
      - **up**: Key is released.
      - **tap**: Combination of previous ones.
  
  **&ast;** - these fields are required

### Troubleshooting
- **Open-Deck just blink and do not start at all.**
  - Try to run it from command line to see error details.
  - Make sure that no other instance of Open-Deck or any other application
    is running at the same port.
- **I did something wrong with my configuration file.**
  - Just delete you configuration file and restart the application, new configuration file will be created.
- **I can access to the web interface locally from host PC but not from another device.**
  - On the first run Open-Deck there could be a Windows Defender firewall prompt
    for setting application as allowed for incoming connections from other devices on a network. 
    If you missed it try to restart host pc and try to run it again.

## Development
### Build
*Requiremets: [Node.js v14.0.0+ installed](https://nodejs.org/en/)*

To build Open-Deck from sources - dependencies for both modules *open-deck-frontend* and *open-deck-server*
have to be installed. Then building of project can begin.
```shell
cd open-deck-frontend
npm install
nom build-frontend
```
In case of *open-deck-frontend* a javascript file is transpiled
into older version of ecma script and result is copied into the *open-deck-server* into its public static directory.
```shell
cd open-deck-server
npm install
nom build-windows
```
Building *open-deck-server* will create executable binary files for Linux, Mac and Windows platform.

## FAQ
- **Where is CSS Grid, Flexbox, WebSockets, SPA, PWA or any other last browser tech approach?**
  - This project is mainly focused to be controllable via older touch devices that support only old or limited browser features.

## TODO:
- User configuration via web interface.
- Password protection.
- Icon management in application.
- Folders support.
- QR url - for easy mobile device access.
- Support for Fullscreen API.
- Configuration validation.
- Custom theming.
- Button Debounce (prevent from unwanted multiple button clicks)

## Currently, we need
- To know how are you using Open-Deck - use cases.
- Your ideas for next features.
