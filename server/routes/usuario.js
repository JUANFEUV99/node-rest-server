const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Usuario = require('../models/usuario');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/usuario', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    });

    usuario.save((err, userdb) => {
        if (err) {
            return {
                status: 400,
                error: err
            };
        };
        res.json({
            usuario: userdb
        });

    });
    res.json({
        persona: body
    });
});
app.get('/usuario', (req, res) => {

    res.json('get hola mundo');
});
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json(id);
});
app.delete('/usuario', (req, res) => {
    res.json('delete hola mundo');
});
app.patch('/usuario', (req, res) => {
    res.json('patch hola mundo');
});


module.exports = {
    app
}