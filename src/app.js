const mongoose = require('mongoose')
const express = require('express')
const app = express()
const pagination = require('./index').default

mongoose.connect(`mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/mongoose_laravel_pagination?replicaSet=rs`, { keepAlive: 1 })

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

userSchema.plugin(pagination)

const User = mongoose.model('users', userSchema)

User.deleteMany({}).then(() => {
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
    User.insertMany(users).then(() => {
        app.get('/users', async (req, res) => {
            const users = await User.find({ sortIndex: { $gt: 10 } })
                .sort({ sortIndex: 1 })
                .paginate(req, { _sno: true });
            res.json(users)
        })
    })
})

app.listen(3000)