const mongoose = require("mongoose")

module.exports = () => {
    try {
        mongoose.connect(process.env.database, {
            useNewUrlParser: true
        })
        console.log("Połączono z Mongo")
    } catch (error) {
        console.log(error);
        console.log("Nie udało się połączyć z Mongo!")
    }
}
