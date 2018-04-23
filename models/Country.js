const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const countrySchema = new Schema({
  name: String,
  description: {type: String},
  Language: {
    type: String,
  },
  weather: {
    type: String,
  },
  cost_of_living: {
    type: Array //???
  },
  pictureUrl: {type: String}, 
  currency: {type: String}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;
