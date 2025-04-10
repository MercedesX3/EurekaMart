const express = require('express');
require('dotenv').config();
const app = express();
const { mongoose } = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB not connected', err));

// User model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}));

// SignUp route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).send('User signed up successfully!');
  } catch (err) {
    res.status(500).send('Error signing up user');
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));