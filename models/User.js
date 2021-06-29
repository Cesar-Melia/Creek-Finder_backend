const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        userName: { type: String, require: true },
        password: { type: String, require: true },
        email: { type: String, require: true },
        role: {
            type: String, enum: ['user', 'admin', 'creator'],
            default: 'user', required: true
        }

    },
    {
        timestamps: true
    }
)

const User = mongoose.model('Users', userSchema)

module.exports = User