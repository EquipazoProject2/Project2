const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({

  name: {
    type: String
  },
  description: {
    type: String
  },
  cuisine_type: {
    type: String
  },
  price: {
    type: Number
  }

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;