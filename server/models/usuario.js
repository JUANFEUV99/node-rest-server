const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniquevalidator = require('mongoose-unique-validator');

let rolesvalidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido'
}
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
        type: Boolean,
        required: false,
        default: false
    },
    google: {
        type: Boolean,
        required: false,
        default: false
    }
});
usuarioSchema.plugin(uniquevalidator, { message: '{PATH} debe ser único' });
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

module.exports = mongoose.model('Usuario', usuarioSchema);