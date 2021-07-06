const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    userName: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    role: {
      type: String,
      enum: ['user', 'admin', 'creator'],
      default: 'user',
      required: true,
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comments' }],
    favorites: [{ type: mongoose.Types.ObjectId, ref: 'Creeks' }],
    img: {
      type: String,
      required: true,
      default: 'https://res.cloudinary.com/creek-finder/image/upload/v1625564708/Users/user_default_blue_zfil71.png',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;
