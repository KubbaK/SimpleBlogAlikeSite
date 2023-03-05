const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
const app = express()
const connection = require("./db.js")
connection()

const RegisterRoute = require("./routes/register.js")
const LoginRoute = require("./routes/login.js")
const SalesRoute = require("./routes/sales.js")
const UsersRoute = require("./routes/users.js")
const CommentsRoute = require("./routes/comments.js")
const middle = require("./middleware/authLogin.js")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use("/login", LoginRoute)
app.use("/register", RegisterRoute)
app.use(middle)
app.use("/sales", SalesRoute)
app.use("/users", UsersRoute)
app.use("/comments",CommentsRoute)

app.listen(7500, () => {
    console.log("Serwer działa. Port: 7500")
})

