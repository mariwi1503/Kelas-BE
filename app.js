const express = require('express')
const app = express()

let users = [
    {
        name: 'agus',
        age: 25
    },
    {
        name: 'dodo',
        age: 22
    },
    {
        name: 'irfan',
        age: 23
    },
]

app.get('/users', (req, res) => {
    res.json({
        status: 'OK',
        data: users
    })
})

app.get('/users/:name', (req, res) => {
    const name = req.params.name
    const user = users.find(x => x.name == name)
    res.json({
        status: 'OK',
        data: user
    })
})

// TODO =
// tambah user
// hapus user

app.listen(3000, () => console.log('Server is listening...'))