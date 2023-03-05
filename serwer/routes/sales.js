const express = require("express")
const { mongo, default: mongoose } = require("mongoose")
const Sale = require("./../models/Sale.js")
const router = express.Router()
const { protect } = require('./../middleware/authLogin.js')

router.get('/', async(req,res) => {  // get ALL
    try{
        const data = await Sale.find()
        res.json(data)
    }
    catch (e){
        res.status(500)
        res.send(e)
    }
})

router.get('/:id', async(req,res) => { // get byID
    try{
        const data = await Sale.findById(req.params.id)
        res.json(data)
    }
    catch (e){
        res.status(500)
        res.send(e)
    }
})

router.post('/', async(req,res) => { // post to db
    var single_sale = await new Sale({
        title: req.body.title,
        description: req.body.description,
        contact_details: req.body.contact_details,
        type: req.body.type,
        publication_date: req.default,
        user:req.body.user,
        comments:req.body.comment
    })
    try{
        single_sale = await single_sale.save()
        res.send("Okej")
    }
    catch (e) {
        res.send(e)
    }   
})

router.patch('/:id', async(req,res) => { // update by ID
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Sale.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (e) {
        res.status(400)
        res.send(e)
    }
})

router.delete('/:id', async(req,res) => { // delete by ID
    try {
        const id = req.params.id;
        const result = await Sale.findByIdAndDelete(id)
        res.send("Usunięto")
    }
    catch (e) {
        res.status(400)
        res.send(e)
    }
})

module.exports = router