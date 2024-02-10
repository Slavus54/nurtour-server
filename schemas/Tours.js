const {Schema, model} = require('mongoose') 

const Tours = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    rating: Number,
    locations: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        image: String,  
        cords: {
            lat: Number,
            long: Number
        },
        likes: Number
    }],
    facts: [{
        shortid: String,
        name: String,
        text: String,
        level: String,
        isTrue: Boolean
    }]
})

module.exports = model('Tours', Tours)