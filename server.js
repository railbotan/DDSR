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

app.use(express.static('static'));

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

app.listen(port, () => console.log(`App listening on port ${port}`));

app.get("/json", (req, res) => {
    res.json({ 'login' : 'lol', 'password' : 'kek' });
});

app.get('/user/:id', function (req, res, next) {
    res.end(req.params.id);
});