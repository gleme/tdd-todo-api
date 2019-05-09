const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: value => {
        return value.indexOf('@') !== -1;
      }
    }
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
