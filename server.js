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

const questions = [
    {
        name: "Какой тигр самый крупный?",
        index: 1,
        imageURL: "https://images.wallpaperscraft.com/image/tiger_aggression_teeth_predator_big_cat_106887_1600x1200.jpg",
        options: [
            {option: "Амурский", optionIndex: 1, index: 1},
            {option:"Малазийский", optionIndex: 2, index: 1},
            {option:"Индийский", optionIndex: 3, index: 1},
            {option:"Суматранский", optionIndex: 4, index: 1}
        ],
        answer: '3'
    },
    {
        name: "Где живет коала?",
        index: 2,
        imageURL: "https://versiya.info/uploads/posts/2019-02/1550993623_s1200.jpg",
        options: [
            {option: "В горной пещере", optionIndex: 1, index: 2},
            {option: "В бамбуковом лесу", optionIndex: 2, index: 2},
            {option: "В тропических лесах Новой Зеландии", optionIndex: 3, index: 2},
            {option: "На эвкалиптовом дереве", optionIndex: 4, index: 2}
        ],
        answer: '4'
    },
    {
        name: "Какого цвета хвост у зебры?",
        index: 3,
        imageURL: "http://fullhdwallpapers.ru/image/animals/2852/tri-zebry.jpg",
        options: [
            {option: "Белый", optionIndex: 1, index: 3},
            {option: "Черный", optionIndex: 2, index: 3},
            {option: "Серый", optionIndex: 3, index: 3},
            {option: "Коричневый", optionIndex: 4, index: 3}
        ],
        answer: '2'
    },
    {
        name: "Какое животное самое быстрое?",
        index: 4,
        imageURL: "https://s1.1zoom.ru/big3/25/Cheetahs_Cubs_Two_Grass_527375_2048x1152.jpg",
        options: [
            {option: "Лев", optionIndex: 1, index: 4},
            {option: "Зебра", optionIndex: 2, index: 4},
            {option: "Сапсан", optionIndex: 3, index: 4},
            {option: "Гепард", optionIndex: 4, index: 4}
        ],
        answer: '4'
    },
];

let score = 0;

app.get("/", (_, res) => {
    res.render("html/index.hbs", {
        layout: "default",
        questions: questions,
        score: score
    });
});

app.post("/", upload.none(), (req, res) => {
    let result = req.body;
    console.log(result);
    let currentScore = 0;
    for (const question of questions) {
        if (result[question.index]) {
            if (result[question.index] === question.answer) {
                currentScore++;
            }
        } else {
            console.log(`have no answer for question ${question.name}`)
        }
    }
    console.log(currentScore);
    score = currentScore;
    res.redirect('/');
});

app.listen(port, () => console.log(`App listening on port ${port}`));
