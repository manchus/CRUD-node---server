const mongoose = require('mongoose');

const commentairesSchema = new mongoose.Schema({
    description: String,
    titleQuestion: String,
    date: String,
    nomUser: String,
    notePositive: String,
    noteNegative: String
});

module.exports = mongoose.model('commentaire', commentairesSchema);