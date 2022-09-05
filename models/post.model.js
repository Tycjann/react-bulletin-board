const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 10,
    },
    authorId: {
      type: String,
      required: true,
      ref: 'User',
    },
    statusId: {
      type: String,
      required: true,
      ref: 'Status',
    },
    price: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    editDate: {
      type: Date,
      required: false,
    },
  },
  {
    // versionKey: '_somethingElse'
    versionKey: false,
  }
);

module.exports = mongoose.model('Post', postSchema);