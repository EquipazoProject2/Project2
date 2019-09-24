const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({

  client_email: {
    type: String
  },
  meal: {
    type: Array,
  },
  drink: {
    type: Array,
  },
  people: {
    type: Number
  },
  table: {
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