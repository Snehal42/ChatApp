const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Chat = require('./models/chat');
const methodOverride = require('method-override');



main()
    .then(()=>{
        console.log("connected to DB");
    }).catch((err)=>{
        console.log(err)
    }
);


async function main(){
    await mongoose.connect( 'mongodb://127.0.0.1:27017/ChatApp' );
}

app.use(express.static(path.join(__dirname,"public")));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set(path.join(__dirname, 'views'));
const port = 8080;

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})

app.get("/",(req,res)=>{
    res.send("Root is Working");
})

// index Rout
app.get("/chats",async(req,res)=>{
    let chats = await Chat.find();
    
    res.render("index.ejs",{chats})
})

//New Rout

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
    
})

app.post("/chats",(req,res)=>{
    let {from,to,msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        createdAt: new Date(),
    });
    newChat.save().then(res => {console.log("Chat Saved");}).catch(err => {console.log(err);});
    res.redirect("/chats");
})


// Edit Rout
app.get("/chats/:id/edit",(req,res)=>{
    let {id} = req.params;
    Chat.findById(id).then(chat => {res.render("edit.ejs",{chat})}).catch(err => {console.log(err);});
})

// Update Rout
app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {new:true,runValidators:true}
    );
    res.redirect("/chats");
});

// Delete Rout
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});