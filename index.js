const express = require("express");  // Importing the express module
const cors = require("cors");
require('./db/config'); // connection with database
const User = require('./db/User') // User model
const app = express();  // Initializing the express
app.use(express.json()); // for converting data(from frontend/postman) to json
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
})

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



app.listen(5000);