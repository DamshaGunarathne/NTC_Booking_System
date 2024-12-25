const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
 
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: { 
      type: String, 
      enum: ["Admin", "Operator", "Commuter"], 
      required: true 
    },
  },
  {
    timestamps: true,
  }
);
 
// Encrypt password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
 
const User = mongoose.model('User', UserSchema);
module.exports = User;