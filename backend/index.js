const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Stripe = require('stripe')

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
app.post("/signup", async (req, res) => {
    const { email } = req.body;

    userModel.findOne({ email: email }, (err, result) => {
        console.log(err);

        if (result) {
            res.send({ message: "User with this email already register", alert: false });
        } else {
            const data = userModel(req.body);
            const save = data.save();
            res.send({ message: "Registered successfully", alert: true });
        }
    });
});

// login
app.post("/login", (req, res) => {
    const { email } = req.body;

    userModel.findOne({ email: email }, (err, result) => {
        if (result) {
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            };

            res.send({
                message: "Login is successfully",
                alert: true,
                data: dataSend,
            });
        } else {
            res.send({
                message: "One of credentials are incorrect, please check again or Sign Up",
                alert: false,
            });
        }
    });
});

//product section
const schemaProduct = mongoose.Schema({
    name: String,
    category:String,
    image: String,
    price: String,
    description: String,
});

const productModel = mongoose.model("product",schemaProduct)

//save product in data
app.post("/uploadProduct",async(req,res) => {
    const data = await productModel(req.body)
    const datasave = await data.save()

    res.send({message : "Upload successfully"})
})
//
app.get("/product",async(req,res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
})

// stripe payment
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session",async(req,res)=>{
    try{
        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card'],
            billing_address_collection : 'auto',

            line_items : req.body.map((item) => {
                return{
                    price_data : {
                        currency : "usd",
                        product_data : {
                            name : item.name,
                        },
                        unit_amount : item.price * 100,
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1,
                    },
                    quantity : item.qty
                }
            }),
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`,
        }

        const session = await stripe.checkout.sessions.create(params)
        res.status(200).json(session.id)
    }
    catch (err){
        res.status(err.statusCode || 500).json(err.message)
    }

})

app.listen(PORT, () => console.log("server is running at port : " + PORT));
