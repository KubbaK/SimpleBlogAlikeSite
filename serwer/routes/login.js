const router = require("express").Router()
const User  = require("../models/user")
const bcrypt = require("bcrypt")
router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return res.status(401).send({ message: "Błędny email lub hasło!" })
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validPassword)
            return res.status(401).send({ message: " Błędny email lub hasło!" })
        const token = user.generateAuthToken();
        const login = user.login;
        const email = user.email;
        res.status(200).send({ data: token,login: login,email: email, message: "Zalogowano!" })
    } catch (error) {
        res.status(500).send({ message: "Wewnętrzny błąd serwera!" + error })
    }
})
module.exports = router