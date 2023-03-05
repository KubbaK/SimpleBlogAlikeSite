const express = require("express")
const { mongo, default: mongoose } = require("mongoose")
const User = require("./../models/User.js")
const router = express.Router()
const { protect } = require('./../middleware/authLogin.js')

router.get('/', async(req,res) => {  // get ALL
    try{
        const data = await User.find()
        res.json(data)
    }
    catch (e){
        res.status(500)
        res.send(e)
    }
})

router.get('/:id', async(req,res) => { // get byID
    try{
        const data = await User.findById(req.params.id)
        res.json(data)
    }
    catch (e){
        res.status(500)
        res.send(e)
    }
})

module.exports = router