const {Schema, model} = require('mongoose') 

const Recipes = new Schema({
    shortid: String,
    account_id: String,
    username: String,
    title: String,
    category: String,
    cuisine: String,
    level: String,
    ingredients: [String],
    steps: [{
        id: String,
        content: String,
        duration: Number
    }],
    time: Number,
    calories: Number,
    link: String,
    rating: Number,
    cookings: [{
        shortid: String,
        name: String,
        text: String,
        image: String,
        likes: Number,
        dateUp: String
    }],
    healthes: [{
        shortid: String,
        name: String,
        ingredient: String,
        category: String,
        percent: Number
    }]
})

module.exports = model('Recipes', Recipes)