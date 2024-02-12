const {Schema, model} = require('mongoose') 

const Heroes = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    fullname: String,
    positions: [String],
    country: String,
    century: String,
    image: String,
    quotes: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        likes: Number
    }],
    achievements: [{
        shortid: String,
        name: String,
        title: String,
        position: String,
        level: String
    }]
})

module.exports = model('Heroes', Heroes)