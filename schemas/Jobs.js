const {Schema, model} = require('mongoose') 

const Jobs = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    tasks: [{
        id: String,
        content: String,
        level: String,
        cost: Number
    }],
    ageBorder: Number,
    compensation: Number,
    dateUp: String,
    time: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    members: [{
        account_id: String,
        username: String,
        role: String
    }],
    photos: [{
        shortid: String,
        name: String,
        text: String,
        image: String,
        likes: Number
    }]
})

module.exports = model('Jobs', Jobs)