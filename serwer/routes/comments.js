const express = require("express")
const { mongo, default: mongoose } = require("mongoose")
const User = require("../models/User.js")
const Sale = require("../models/Sale.js")
const Comment = require("./../models/Comment.js")
const router = express.Router()
const protect = require('./../middleware/authLogin.js')


router.get('/', async(req,res) => {  // get ALL
    try{
        const data = await Comment.find()
        res.json(data)
    }
    catch (e){
        res.status(500)
        res.send(e)
    }
})

router.get('/:id', async(req,res) => { // get byID
    try{
        const data = await Comment.findById(req.params.id)
        res.json(data)
    }
    catch (e){
        res.status(500)
        res.send(e)
    }
})

router.post('/', async(req,res) => { // POST to DB
    const u = await User.findOne({_id: req.body.user})
    const s = await Sale.findOne({_id: req.body.sale})
    var single_comment = new Comment({
        content: req.body.content,
        publication_date: req.default,
        user:req.body.user,
        sale:req.body.sale
    })
    try{
        single_comment = await single_comment.save()
        u.comments.push({_id: single_comment.id})
        await u.save()
        s.comments.push({_id: single_comment.id})
        await s.save()
        res.send("Okej")
    }
    catch (e) {
        res.send(e)
    }   
})

router.patch('/:id',  async(req,res) => { // update by ID
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Comment.findByIdAndUpdate(
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
    var c = await Comment.findOne({_id: req.params.id})
    var u = await User.findOne({_id: c.user})
    var s = await Sale.findOne({_id: c.sale})
    try {
        const idd = req.params.id;
        await Comment.findByIdAndDelete(idd)
        const indexOfObject = u.comments.findIndex(id => {
            return JSON.stringify(id.toString()) == JSON.stringify(idd.toString());
        });
        u.comments.splice(indexOfObject, 1);
        u.save(); 

        const indexOfObject1 = s.comments.findIndex(id => {
            return JSON.stringify(id.toString()) == JSON.stringify(idd.toString());
        });
        s.comments.splice(indexOfObject1, 1);
        s.save(); 
        
        res.send("Usunięto")
    }
    catch (e) {
        res.status(400)
        res.send(e.message)
    }
})

module.exports = router