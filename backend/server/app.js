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

app.post("/set-diet", async (req, res) => {
    const token = req.headers["authorization"];
    console.log("Bobby");
    try {
        const decoded = jwt.verify(token, jwt_password);
        const userId = decoded.id;

        const newDiets = req.body.selectedDiets || [];
        console.log(newDiets);

        const result = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { diet: { $each: newDiets } } },
            { new: true }
        );

        res.status(200).json({ message: "Diets added!", user: result });
    } catch (err) {
        console.error(err);
        res.status(400).json({ status: "error", message: "Could not add diets" });
    }

})

app.post("/set-intolerances", async (req, res) => {
    const token = req.headers["authorization"];
    console.log("Adam");
    try {
        const decoded = jwt.verify(token, jwt_password);
        const userId = decoded.id;

        const newIntolerances = req.body.selectedIntolerances || [];
        console.log(newIntolerances);

        const result = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { intolerances: { $each: newIntolerances } } },
            { new: true }
        );

        res.status(200).json({ message: "Intolerances added!", user: result });
    } catch (err) {
        console.error(err);
        res.status(400).json({ status: "error", message: "Could not add diets" });
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
            { $addToSet: { items: newItem } },
            { new: true }
        );

        res.status(200).json({ message: "Item added!", user: result });
    } catch (err) {
        console.error(err);
        res.status(400).json({ status: "error", message: "Could not add item" });
    }
});

app.post("/get-search", async (req, res) => {
    const title = req.body.type;

    try {
        const response = await axios.get(
            "https://api.spoonacular.com/recipes/complexSearch",
            {
                params: {
                    query: title,
                    apiKey: SPOONACULAR_API_KEY,
                    number: 5,
                }
            }
        );

        console.log(response, "Success with get-item: ");
        res.json(response.data);
    } catch (err) {
        console.log(err, "Error with get-item")
    }
})

app.post("/get-type", async (req, res) => {
    const mealType = req.body.type;

    try {
        const response = await axios.get(
            "https://api.spoonacular.com/recipes/complexSearch",
            {
                params: {
                    type: mealType,
                    apiKey: SPOONACULAR_API_KEY,
                    number: 10,
                }
            }
        );

        console.log(response, "Success with get-type: ");
        res.json(response.data);
    } catch (err) {
        console.log(err, "Error with get-type")
    }
})

app.post("/get-recipe", async (req, res) => {
    //console.log("💥 /get-recipe HIT");
    const items = req.body.items || [];
    //console.log("✅ Received items from frontend:", items);
    const ingredients = items.map(item => item.itemName).join(",");
    //console.log("🧠 Ingredients being sent to Spoonacular:", ingredients);

    try {
        const response = await axios.get(
            "https://api.spoonacular.com/recipes/findByIngredients",
            {
                params: {
                    ingredients,
                    number: 5,
                    apiKey: SPOONACULAR_API_KEY,
                },
            }
        );

        const recipes = response.data.map(r => ({
            id: r.id,
            title: r.title,
            image: r.image,
            usedIngredientCount: r.usedIngredientCount,
            missedIngredientCount: r.missedIngredientCount
        }));

        res.status(200).json(recipes);
    } catch (err) {
        console.error("Error fetching recipes:", err.message);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});


app.listen(5001,()=> {
    console.log("Node js server started");
})