var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectSchema = Schema({
  name: String,
  description: String,
  category: String,
  year: Number,
  langs: String,
  image: String,
});

module.exports = mongoose.model('Project', ProjectSchema);
