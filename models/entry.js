// Define a schema for journal entries with content, author (linking to a User), mood, sentimentScore, and createdAt.
const mongoose = require('mongoose');
const { Schema } = mongoose;
// why {Schema} ? because we are using Schema.Types.ObjectId

const entrySchema = new Schema({
  content: {
    type: String,
    required: true
  },
  // This creates a relationship between this entry and a specific user
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Refers to the 'User' model we just created
    required: true
  },
  mood: {
    type: String,
    enum: ['Happy', 'Sad', 'Anxious', 'Productive', 'Neutral'], // Optional: limits the possible values
    default: 'Neutral'
  },
  sentimentScore: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the creation date
  }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;