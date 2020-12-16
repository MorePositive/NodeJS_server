const fs = require("fs");
const path = require("path");

const createFolder = () => {
    fs.mkdir(
        path.join(__dirname, "../X-files"),
        err => {
            if (err && err.errno === -4075) {
                console.log("Take it easy. Even one folder is full of secrets");
            } else {
                console.log("Nice! You have create a secret folder, now you can fill it with X-files '/newfile'");
            }
        }
    )
};

const createFile = () => {
    const rnd = (Math.random() * 5).toFixed(3);
    fs.writeFile(
        path.join(__dirname, "../X-files", `file_${rnd}.js`),
        `//Hello, created file №${rnd}`,
        err => {
            if (err && err.errno === -4058) {
                console.log("First of all, you should create a folder by typing '/folder'");
            } else {
                console.log("File created");
            }
        }
    )
};

module.exports = { createFolder, createFile };
