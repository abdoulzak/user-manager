const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const marchandSchema = mongoose.Schema({
    firstId:{ type: String, required: true },
    lastName:{ type: String, required: true },
    firstName:{ type: String, required: true },
    numero:{ type: String, required: true },
    password: { type: String, required: true },
    ref:{ type: String, required: true },
    status:{ type: String, required: true },
    frozen:{ type: Boolean, required: true },
    creatDate:{ type: String, required: true },
    updateDate:{ type: String, required: true },
});

marchandSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', marchandSchema);