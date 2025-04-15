const express=require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL).then(()=> {
    console.log("DB Connected")
}).catch((e) => {
    console.log(e);
})

require('./UserDetails')
const User = mongoose.model("UserInfo");

app.get("/",(req, res) => {
    res.send({status: "Started"})
})

app.post('/register', async(req, res) => {
    const {name, email, password} = req.body;

    const oldUser= await User.findOne({email:email});
    if(oldUser) {
        return res.send({data: "User already exists!!"});

    }
    try {
        await User.create({
            name: name,
            email: email,
            password, password,
        });
        res.send({status: "ok", data: "user created"});
    } catch (err) {
        res.send({status: "error", data: error});
    }
})

app.listen(5001,()=> {
    console.log("Node js server started");
})