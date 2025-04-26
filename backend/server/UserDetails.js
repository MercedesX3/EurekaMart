const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    items: [{
        itemName: String,
        quantity: Number,
    },],
    diet: [String],
    intolerances: [String],
}, {
    collection: "UserInfo"
});

mongoose.model("UserInfo", UserDetailSchema);