const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // unique: true,
    // required: true,
  },
  role:{
    type:String,
    enum:["Client","Admin"],
    default:"Client"
  },
  active:{
    type:Boolean,
    default: false,
  },
  confirmationCode:{
    type:String,
  },
  googleID: String,
  photo: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;
