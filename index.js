const http = require("http");
const path = require("path");
const fs = require("fs");

const createFolder = () => {
    fs.mkdir(
        path.join(__dirname, "X-files"),
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
        path.join(__dirname, "X-files", `file_${rnd}.js`),
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

const server = http.createServer((req, res) => {

    switch(req.url) {
        case "/": 
            console.log("Welcome to home page");
            break;
        case "/about": 
            console.log("About page welcomes you");
            break;
        case "/contacts": 
            console.log("You are on 'Contacts' page");
            break;
        case "/folder":
            createFolder();
            break;
        case "/newfile":
            createFile();
            break;
        default:
            console.log("Oops, we missed this page");
    };
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
