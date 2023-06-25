const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({limit: '10mb'}));

const PORT = process.env.PORT || 8080;

//mongodb connection
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
});

const userModel = mongoose.model("user", userSchema);

// sign in
app.post('/signup', (req, res) => {
    console.log(res.data)
})

app.listen(PORT, () => console.log("server is running at port : " + PORT));
