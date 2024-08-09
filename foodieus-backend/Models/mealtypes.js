const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealtypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mealTypeId: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('mealtype', mealtypeSchema, 'mealtypes');