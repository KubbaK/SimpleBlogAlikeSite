const router = require("express").Router()
const  User  = require("../models/User")
const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user)
            return res
                .status(409)
                .send({ message: "Użytkownik o takim emailu istnieje!" })
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        await new User({ ...req.body, password: hashPassword }).save()
        res.status(201).send({ message: "Utworzono użytkownika" })
    } catch (error) {
        res.status(500).send({ message: "Wewnętrzny błąd serwera" + error })
    }
})
module.exports = router