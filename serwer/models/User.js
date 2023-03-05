const mongoose = require("mongoose")
const jwtoken = require("jsonwebtoken")

const schema_user = new mongoose.Schema({
        login:{
            type:String,
            unique:true,
            required:[true, "Please, type your login"],
            minLength:[3,"Login provided is too short!"],
            maxLength:[20,"This login is too long, try again!"]
        },
        email:{
            type:String,
            unique:true,
            required:[true, "Please, add your email"],
            match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"Podano nie prawidłowy znak!"]
        },
        password:{
            required:true,
            type:String,
            minLength:[8,"Your password is too short!"],
            match:[/(?=.*[a-z])/,"Please add a lowercase char to your password"],
            match:[/(?=.*[A-Z])/,"Please add a upperchase char to your password"],
            match:[/(?=.*[0-9])/,"Please add at least one digit to your password"],
            match:[/(?=.*[!@#$%^&*])/,"Please add a special char to your password"]
        },
        sales:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Sale'
            }
        ],
        comments:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Comment'
            }
        ]
    }
)
schema_user.methods.generateAuthToken = function () {
    const token = jwtoken.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {expiresIn: "7d",})
    return token
}

module.exports = mongoose.models.User || mongoose.model('User', schema_user);