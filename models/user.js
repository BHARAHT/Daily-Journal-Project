// Define a schema for users with username and password
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Each username must be unique
    trim: true    // Removes whitespace from both ends
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);
//what is User inside mongoose.model ? it is the name of the model
//it is used to refer to the model in other parts of the application
//Difffference betwwen const User and mongoose.model('User', userSchema) ?
//User is the variable that holds the model
//mongoose.model('User', userSchema) is the function that creates the model
module.exports = User;