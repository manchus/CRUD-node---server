const mongoose = require('mongoose');

const utilisateursSchema = new mongoose.Schema({
    nomUser: String,
    nom: String,
    prenom: String,
    email: String,
    genre: String,
    age: String,
});

module.exports = mongoose.model('utilisateur', utilisateursSchema);