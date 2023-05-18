const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    _id: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 2
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 2
    },
    role: {
        type: String,
        trim: true,
        minLength: 2
    }
});

const pangolinSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    },
    role: {
        type: String,
        unique: false,
        trim: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 2
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    },
    friends: [friendSchema]
},
{
    timestamps: false
});

const Pangolin = mongoose.model('Pangolin', pangolinSchema);

module.exports = Pangolin;