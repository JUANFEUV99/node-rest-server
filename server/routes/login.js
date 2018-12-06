const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwd = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, userdb) => {
        if (err) {
            res.status(400).json({
                mensaje: 'Ha ocurrido un error',
                err
            });
        }
        if (!userdb) {
            res.status(200).json({
                status: 200,
                mensaje: '(Usuario) o contaseña incorrectos'
            });
        } else {
            if (!bcrypt.compareSync(body.password, userdb.password)) {
                res.status(200).json({
                    status: 200,
                    mensaje: 'Usuario o (contaseña) incorrectos'
                });
            } else {
                let token = jwd.sign({
                        usuario: userdb
                    },
                    'secret', { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    mensaje: 'inicio de sección exitoso',
                    token
                });
            }
        }
    });
});

//config google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    return {
        name: payload.name,
        email: payload.email,
        picture: payload.picture
    }
}

app.post('/google', async(req, res) => {
    let idtoken = req.body.idtoken;
    //res.json(body);
    let google_user = await verify(idtoken).catch(e => {
        return res.status(403).json({
            ok: false,
            err: e
        });
    });
    Usuario.findOne({ email: google_user.email }, (err, userdb) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        if (!userdb) {
            res.status(200).json({
                ok: true,
                mensaje: 'you will be signed up'
            });
            let usuario = new Usuario({
                nombre: google_user.name,
                email: google_user.email,
                password: 'None',
                google: true,
                img: google_user.picture
            });
            usuario.save((err, user) => {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        err
                    });
                }
            });
        } else {
            res.status(200).json({
                ok: true,
                mensaje: 'you were logged in'
            });
        }
    });

});

module.exports = app;