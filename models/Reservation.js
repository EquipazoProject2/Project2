const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("../models/User");

const reservationSchema = new Schema({

  client_email: {
    type: String
  },
  meal: {
    type: Array,
  },
  cocktail: {
    type: Array,
  },
  people: {
    type: Number
  },
  table: {
    type: Number
  },
  reservation_hour: {
    type: String
  },
  reservation_date: {
    type: String
  },
  reservation_cuisine: {
    type: String
  },
  total_price: {
    type: Number
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;