const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    admin: {
      type: String,
      required: true,
    },
    master: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    addDate: {
      type: Date,
      required: true,
    },
  },
  {
    // versionKey: '_somethingElse'
    versionKey: false,
  }
);

module.exports = mongoose.model('User', userSchema);
