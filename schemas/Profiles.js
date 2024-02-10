const {Schema, model} = require('mongoose') 

const Profiles = new Schema({
    account_id: String,
    username: String,
    security_code: String,
    telegram: String,
    role: String,
    weekday: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    childs: [{
        shortid: String,
        fullname: String,
        sex: String,
        status: String,
        image: String
    }],
    manuscripts: [{
        shortid: String,
        title: String,
        category: String,
        words: Number,
        image: String,
        likes: Number,
        dateUp: String
    }],
    account_components: [{
        shortid: String,
        title: String,
        path: String
    }]
})

module.exports = model('Profiles', Profiles)