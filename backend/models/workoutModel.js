const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//schema represents the structure
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }

}, {timestamps: true});

//model represents the collection and helps you interact with it 
module.exports = mongoose.model('Workout', workoutSchema);


