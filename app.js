// const fs = require('node:fs');
// const path = require("node:path");
//
// const readStream = fs.createReadStream(path.join('text.txt'), {highWaterMark: 128 * 128});
// const writeStream = fs.createWriteStream(path.join(process.cwd(), 'text2.txt'))
// readStream.on("data", (chunk)=>{
//     writeStream.write(chunk);
// })


const express = require('express');

const users = require('./users.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// const users = [
//     {
//         name: 'Anton',
//         age: 34,
//         gender: 'male',
//     },
//     {
//         name: 'Anna',
//         age: 34,
//         gender: 'female',
//     },
//     {
//         name: 'Igor',
//         age: 23,
//         gender: 'male',
//     },
//     {
//         name: 'Ira',
//         age: 12,
//         gender: 'female',
//     },
// ]

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`)
})

app.get('/users', (req, res) => {
    res.status(200).json(users);
})

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    res.status(200).json(users[+userId]);
})
app.get('/welcome', (req, res) => {
    // console.log(req);
    console.log('Welcome!!');
    res.send('Welcome')
    res.end();
})

app.post('/users', (req, res) => {
    const body = req.body;
    users.push(body);
    console.log(body);

    res.status(201).json({
        message: 'User has been created!'
    })
})

app.put('/users/:userId', (req, res) => {
    const updatedUser = req.body;
    const {userId} = req.params;

    users[+userId] = updatedUser;

    res.status(200).json({
        message: 'User has been updated',
        data: users[+userId]
    })
})

app.delete('/users/:userId', (req, res) => {
    const {userId} = req.params;
    users.splice(+userId, 1);

    res.status(203).json({
        message: 'User has been deleted',
        // data: users[+userId-1]
    })
})