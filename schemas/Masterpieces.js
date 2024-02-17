const {Schema, model} = require('mongoose') 

const Masterpieces = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    country: String,
    epoch: String,
    main_photo: String,
    pictures: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        image: String,
        likes: Number
    }],
    channels: [{
        shortid: String,
        name: String,
        title: String
    }]
})

module.exports = model('Masterpieces', Masterpieces)