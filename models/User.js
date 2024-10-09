// models/User.js
const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }  // You can have different roles if needed
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;




module.exports=User;
