const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const marchandSchema = new mongoose.Schema({
    firstId: { type: String, required: false },
    lastName: { type: String, required: false },
    firstName: { type: String, required: false },
    numero: { type: String, required: true },
    password: { type: String, required: true },
    ref: { type: String, required: false },
    status: { type: String, required: false },
    frozen: { type: Boolean, required: false },
    creatDate: { type: String, required: true },
    updateDate: { type: String, required: true },
});

marchandSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', marchandSchema);