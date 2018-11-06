const path = require("path");
const fs = require("fs");
const request = require("request");

const tempDir = path.join(__dirname, "..");
let download = (url) => {
    return new Promise((resolve, reject) => {
        const tempFileName = `temp${Date.now()}.jpg`;
        const tempFilePath = path.join(tempDir, tempFileName);
        const writeFileTo = fs.createWriteStream(tempFilePath);
        const getImageFile = request.get(url);
    
        getImageFile.pipe(writeFileTo);
        getImageFile.on("error", reject);
        getImageFile.on("complete", resolve);
    })

    
}

module.exports = download;