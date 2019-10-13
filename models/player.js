const mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;

let playerSchema = new Schema({
    name: { type: String, required: [true, 'El campo nombre es obligatorio'] },
    middlename: { type: String },
    lastname: { type: String, required: [true, 'El campo nombre es obligatorio'] },
    age: { type: Number, required: [true, 'El campo edad es obligatorio'] },
    email: {
        unique: true,//Validar que solo exista una dirección de email
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    img: {type: String },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    state: { type: Boolean, default: true },
    google: { type: Boolean, default: false }
});

// Elimino el campo password del modelo Player cuando lo imprimo en JSON
playerSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

playerSchema.plugin(uniqueValidator, {message: '{PATH} debe ser único'});

module.exports = mongoose.model('Player', playerSchema);