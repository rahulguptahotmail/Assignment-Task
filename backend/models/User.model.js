const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username:{type : 'string',required: true},
    email:{type :'string', required: true, unique: true},
    password:{type :'string', required: true},
    role:{type :'string', required: true, enum: ['user', 'sellerAdmin','superAdmin'],default: 'user'},
    createAt:{type:'date', default: Date.now()},
    cart:{type: [mongoose.Schema.ObjectId]}
})


module.exports = mongoose.model('User',userSchema);