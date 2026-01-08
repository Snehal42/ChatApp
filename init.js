const mongoose = require('mongoose');
const Chat = require('./models/chat');

async function main(){
    await mongoose.connect( 'mongodb://127.0.0.1:27017/ChatApp' );
}

let allChats = [{
    from: "Alice",
    to: "Bob",
    msg: "How are you, Bob?",
    created_at: new Date(),
},{
    from: "Bob",
    to:"Alice",
    msg:"lorem10",
    created_at: new Date(),
},{
    from: "Adi",
    to: "Bella",
    msg: "How are you, Bob?",
    created_at: new Date(),
},{
    from: "Bella",
    to:"Adi",
    msg:"lorem10",
    created_at: new Date(),
}
];

Chat.insertMany(allChats);