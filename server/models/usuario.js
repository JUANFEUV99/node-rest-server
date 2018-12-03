const mongoose = require('mongoose');
const Schema = mongoose.Schema

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    email: {
        type: String,
        required: [true, 'Email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean
    },
    google: {
        type: Boolean
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);