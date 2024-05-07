const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userToken = new Schema({
    token: {
        type: String,
        required: true
    },
    is_active: {
        type: Number,
        required: true,
        default: 0,
    },
    user:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const User = mongoose.model('UserToken', userToken);

module.exports = User;
