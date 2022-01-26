const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    nomUser: String,
    idUser: String,
    idQuestion: String,

});

module.exports = mongoose.model('login', loginSchema);