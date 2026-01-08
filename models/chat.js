
const mongoose = require('mongoose');


const ChatSchema = new mongoose.Schema({
    from: {
        type: String,
        required : true,
    },
    to: {
        type: String,
        required: true,
    },
    msg:{
        type:String,
        maxLength:100,
    },
    createdAt: {
        type: Date,
        required: true,
    }
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;
   



