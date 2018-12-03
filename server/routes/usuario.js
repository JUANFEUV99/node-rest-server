const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/usuario', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, userdb) => {
        if (err) {
            res.status(400).json({
                status: 400,
                err
            });
        };
        res.status(200).json({
            usuario: userdb
        });

    });
});
app.get('/usuario', (req, res) => {
    Usuario.find({}).exec((err, usuarios) => {
        if (err) {
            res.status(400).json({
                status: 400,
                err
            });
        }
        res.status(200).json({
            usuarios
        });
    });
});
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userdb) => {
        if (err) {
            res.status(400).json({
                error: 400,
                mensaje: 'Ocurrió un error',
                err
            });
        }
        if (!userdb) {
            res.status(400).json({
                status: 400,
                mensaje: 'Usuario no encontrado'
            });
        } else {
            res.status(200).json({
                persona: userdb
            });
        }
    });
});
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    Usuario.findByIdAndDelete(id, (err, userdb) => {
        if (err) {
            res.status(400).json({
                status: 400,
                err
            });
        }
        if (!userdb) {
            res.status(400).json({
                status: 400,
                mensaje: 'Usuario no encontrado'
            });
        } else {
            res.status(200).json({
                persona: userdb
            });
        }
    });
});


module.exports = {
    app
}