const express=require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
require("dotenv").config();

const jwt = require('jsonwebtoken');
const jwt_password = process.env.JWT_KEY;
const bcrypt = require('bcryptjs');

const mongoURL = process.env.MONGO_URL;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_KEY;
const axios = require("axios");

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
            password: password,
        });
        res.send({status: "ok", data: "user created"});
    } catch (err) {
        res.send({status: "error", data: error});
    }
})

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Finding user
      const oldUser = await User.findOne({ email: email });
      console.log("BOBBY");
      if(oldUser) {
        if(oldUser.password === password) {
            const token = jwt.sign({ id: oldUser._id }, jwt_password, { expiresIn: "1h" });
            res.json({ status: "ok", token });
        }
        else {
            res.json("Password was incorrect")
        }
      } else {
        res.json("No record existed");
      }

    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
  app.post("/signout", (req, res) => {
    // On client: remove token from storage.
    // On server: optionally log signout activity or invalidate token if using a token blacklist system.
    res.status(200).json({ status: "ok", message: "Signed out successfully" });
});

app.post('/get-name', async (req, res) => {
    const token = req.headers["authorization"];
    try {
        const decoded = jwt.verify(token, jwt_password);
        const userId = decoded.id;

        const oldUser = await User.findById(userId);
        if (!oldUser) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        res.status(200).json({ status: "ok", name: oldUser.name });

        
    } catch (err) {
        console.log(err);
        res.status(400).json({ status: "error", message: "Could not get name" });
    }
})

app.post("/get-item", async (req, res) => {
    const token = req.headers["authorization"];
    try {
        const decoded = jwt.verify(token, jwt_password);
        const userId = decoded.id;

        const oldUser = await User.findById(userId);
        if (!oldUser) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        res.status(200).json({ status: "ok", name: oldUser.items });
    } catch (err) {
        console.log(err);
        res.status(400).json({ status: "error", message: "Could not get items" });
    }
})

app.post("/add-item", async (req, res) => {
    const token = req.headers["authorization"];

    try {
        const decoded = jwt.verify(token, jwt_password);
        const userId = decoded.id;

        const { itemName, quantity } = req.body;
        const newItem = { itemName, quantity };

        const result = await User.findByIdAndUpdate(
            userId,
            { $push: { items: newItem } },
            { new: true }
        );

        res.status(200).json({ message: "Item added!", user: result });
    } catch (err) {
        console.error(err);
        res.status(400).json({ status: "error", message: "Could not add item" });
    }
});

app.post("/get-recipe", async(req, res) => {
    const items = req.body.items;
    // const ingredients = items.map(item => item.itemName).join(",");
    const ingredients = "apples,flour,sugar";
    console.log("DAVE");
    try {
        const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`,
        {
            params: {
            ingredients,
            number: 5,
            apiKey: SPOONACULAR_API_KEY,
            },
        }
        )
        console.log(response);
    } catch (err) {
        console.error(err);
    }
});

app.listen(5001,()=> {
    console.log("Node js server started");
})