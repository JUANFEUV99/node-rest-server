const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config/config');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;

    if (name === undefined) {
        res.status(400).json({
            mensaje: 'información faltante'
        });
    } else {
        res.send('post hola mundo \n' +
            `name: ${name}\nage: ${age}`);
    }
});
app.get('/', (req, res) => {
    res.send('get hola mundo');
});
app.put('/', (req, res) => {
    res.send('put hola mundo');
});
app.delete('/', (req, res) => {
    res.send('delete hola mundo');
});
app.patch('/', (req, res) => {
    res.send('patch hola mundo');
});

app.listen(process.env.PORT, () => console.log(`running on port ${process.env.PORT}`));