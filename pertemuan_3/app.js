const express = require("express");
const cors = require('cors')
const app = express();

const userRoute = require('./routes/user.route')
const postRoute = require('./routes/post.route')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// supaya bisa diakses dari origin lain
app.use(cors())

// routes
app.use('/api', userRoute, postRoute)

app.listen(3000, () => console.log("Server is listening..."));

