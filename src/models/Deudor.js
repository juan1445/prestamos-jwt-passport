const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const DeudorSchema = new Schema({
    name: String,
    identification: String,
    phone: Number,
    lean: Number,
    email:String,
    password: String,
    created_since: { type: Date, default: Date.now }
});

// nos permite cifrar la contraseña
DeudorSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash
};

// comparar la contraseña

DeudorSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('Deudor',DeudorSchema);