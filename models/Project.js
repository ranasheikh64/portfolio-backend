const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  googlePlayStore: {
    type: String,
  },
  appleAppStore: {
    type: String,
  },
  github: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
