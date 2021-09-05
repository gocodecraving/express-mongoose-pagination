const mongoose = require('mongoose')
const express = require('express')
const app = express()
const laravelMongoosePagination = require('./laravel-mongoose-pagination')

mongoose.connect(`mongodb://127.0.0.1:27017/laravel_mongoose_pagination`)

const userSchema = new mongoose.Schema({
    sortIndex: Number,
    name: String,
    username: String,
    email: String,
    mobile: String,
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: new Date
    }
})

userSchema.plugin(laravelMongoosePagination)

const User = mongoose.model('users', userSchema)

User.deleteMany({}).exec()

const users = []

for (const [index, _] of Array(50).fill().entries()) {
    users.push({
        sortIndex: index + 1,
        name: `User ${index + 1}`,
        username: `myusername_${index + 1}`,
        email: `test-user-${index + 1}@test.com`,
        mobile: `98${Math.floor(Math.random() * 100000000)}`
    })
}

User.insertMany(users)

app.get('/users', async (req, res) => {
    const users = await User.find()
        .sort({ sortIndex: -1 })
        .paginate(req);
    res.json(users)
})

app.listen(3000)