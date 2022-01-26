const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
    title: String,
    description: String,
    calification: String,
    date: String,
    nomUtilisateur: String,
});

module.exports = mongoose.model('question', questionsSchema);