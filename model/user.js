const mongoose = require('mongoose');
  const newschema = new mongoose.Schema({
    email: {
      type: String,
      unique: true, // Enforce uniqueness on the email field
    },
    password: {
      type: String,
    },
    createdEvent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
      },
    ],
  });
  
  module.exports = mongoose.model('User', newschema);