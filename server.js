const WebSocket = require("ws");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");
const multer  = require('multer');
const upload = multer();


const rootDir = process.cwd();
const port = process.env.PORT || 5000;

const app = express();

let sessions = new Map();

let sessionId = 0;

app.use(express.static('static/'));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(express.json());

app.engine(
    "hbs",
    hbs({
        extname: "hbs",
        defaultView: "default",
        layoutsDir: path.join(rootDir, "views/layouts"),
    })
);

app.get("/", (_, res) => {
    res.render("html/index.hbs", {
        layout: "default"
    });
});

app.get("/create", (req, res) => {
    sessions.set(sessionId++, []);
    res.render("html/session.hbs", {
        layout: "default",
        id: sessionId++,
    });
});

const server = app.listen(port, () => console.log(`App listening on port ${port}`));

const wss = new WebSocket.Server({
    noServer: true,
});

wss.on('connection', function connection(ws) {
    ws.on("message", e => {
        let obj = JSON.parse(e);
        sessions.get(obj.id).push({ smile: obj.smile, time: obj.time });
    });
});