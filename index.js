const express = require("express");  // Importing the express module
const cors = require("cors");
require('./db/config'); // connection with database
const User = require('./db/User') // User model
const Product = require('./db/Product')
const app = express();  // Initializing the express
app.use(express.json()); // for converting data(from frontend/postman) to json
app.use(cors());


// user register api
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
})


// user login api
app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");

        if (user) {
            resp.send(user);
        }
        else {
            resp.send({ result: 'No User Found' })
        }
    }
    else {
        resp.send({ result: 'No User Found' })
    }
})


// add product api
app.post("/add-product", async (req, resp) => {
    const product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
    // resp.send("product api")
})

// product listing api
app.get("/products", async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No products Found!" })
    }
})

// product delete api
app.delete("/product/:id", async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result)
})




app.listen(5000);