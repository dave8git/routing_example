const express = require('express');
const { homedir } = require('os');
const path = require('path');

const app = express();

const home = (res) => {
    res.send('Hello World!');
};

app.use((req, res, next) => {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/${name}`));
    };
    next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.use('/user', (req, res, next) => {
    res.send('Please login:');

});

app.get('/', (req, res) => {
    home(res);
});

app.get('/home', (req, res) => {
    home(res);
});

app.get('/about', (req, res) => {
    res.send('About me.');
});

app.use((req, res) => {
    res.status(404).show('404.html');
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});