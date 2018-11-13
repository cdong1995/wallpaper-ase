const finder = require('fs-finder')
const path = require('path')
const later = require('later')

const tempDir = path.join(__dirname, "../../wallpapers");
let files = finder.in(tempDir).findFiles("*.<(jpg|jpeg|png|bmp|gif|tiff)>");

let text = 'every 1 minutes';
let s = later.parse.text(text);
later.date.localTime();

function changer() {
    return new Promise((resolve, reject) => {
        tempFilePath = getRandom(files)
        const script = spawn("osascript", [
            "-e",
            `tell application "Finder" to set desktop picture to POSIX file "${tempFilePath}"`
          ]);
        script.on("close", resolve);
        script.on("close", reject);
    })
    // console.log()
}

function getRandom(obj) {
    // checking if object is array ... if so, return random objec from the array
    if (typeof (obj) == 'number') {
        var max = parseInt(obj), min = 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    if (typeof (obj) == 'object' && obj instanceof Array) {
        return obj[Math.floor(Math.random() * obj.length)]
    }

    throw new Error('unknonw type');
}

module.exports = () => {timer = later.setInterval(changer, s)}
