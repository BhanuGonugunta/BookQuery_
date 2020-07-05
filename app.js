const express = require('express');

var bodyParser = require('body-parser');

var fs = require('fs');

const fetch = require('node-fetch');

const apikey = 'AIzaSyC74R_DKJS4HkVS38_WrGFUx6sXlOhoWhM';

const app = express();

app.listen(3000);

var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }))

const categories = [
    {title : 'Action and Adventure'},
    {title : 'Fantasy'},
    {title : 'Romance'},
    {title : "Womens Fiction"},
    {title : 'History'},
    {title : 'True Crime'},
    {title : 'Classics'},
    {title : 'Historical Fiction'},
    {title : 'Sci-Fi'},
    {title : 'Biographies and Autobiographies'},
    {title : 'Detective and Mystery'},
    {title : 'Horror'},
    {title : 'Short Stories'},
    {title : 'Cookbooks'},
    {title : 'Poetry'},
    {title : 'Comic Book'},
    {title : 'Literary Fiction'},
    {title : 'Suspense and Thrillers'},
    {title : 'Essays'},
    {title : 'Self-Help'},
]

const books = [
    {title : 'A Pocket full of rye'},
    {title : 'Before I Go to Sleep'}, 
    {title : 'Behind Closed Doors'},
    {title : 'Gone Girl'},  
    {title : 'Killing Floor'},
    {title : 'Second Life'},
    {title : 'Sharp Objects'},
    {title : 'Stillhouse Lake'},
    {title : 'The Girl on the Train'},
    {title : 'The Silent Patient'},
    {title : 'The Talented Mr Ripley'},
]

app.get('/', (req, res) => {
    res.render('home', {books});
});

app.get('/categories', (req, res) => {
    res.render('categories', {categories});
});

app.get('/home', (req, res) => {
    res.redirect('/');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});



app.post('/detail', urlencodedParser, (req, res) => {
    console.log(req.body);
    fetch('https://www.googleapis.com/books/v1/volumes?q='+req.body.name+'&key='+apikey+'&maxResults=40')
        .then(response => response.json())
        .then(data => res.render('detail', {data}))
});

app.get('/detail', (req, res) => {
    res.render('detail');
});

app.post('/results', urlencodedParser, (req, res) => {
    console.log(req.body);
    fetch('https://www.googleapis.com/books/v1/volumes?q='+req.body.name+'&key='+apikey+'&maxResults=40')
        .then(response => response.json())
        .then(data => res.render('results', {data}))
});

app.use((req, res) => {
    res.status(404).render('404');
})