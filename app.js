const express = require('express');
const {fsReader, fsWriter} = require('./fs.services')
const {userValidator} = require("./userValidator");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`)
})

app.get('/users', async (req, res) => {

    const users = await fsReader();
    res.status(200).json(users);
})

app.get('/users/:userId', async (req, res) => {

    const {userId} = req.params;
    const users = await fsReader();

    const user = users.find(user => user.id === +userId);

    user ? res.status(200).json(user) : res.status(422).json(`User not found`)
})

app.post('/users', async (req, res) => {

    const {name, age, gender} = req.body;

    userValidator(name, age, gender, res);

    const users = await fsReader();

    const newId = 1 + users[users.length-1].id;

    const user = {
        id: newId,
        name,
        age,
        gender
    }

    users.push(user)
    await fsWriter(users)

    res.status(201).json({
        message: 'User has been created!',
        data: user
    })
})

app.put('/users/:userId', async (req, res) => {
    const {name, age, gender} = req.body;
    const {userId} = req.params;

    userValidator(name, age, gender, res);

    const users = await fsReader();

    const user = users.find(user => user.id === +userId);

    if (!user) {
        res.status(422).json(`User not found`)
    }

    users[userId] = {...user, ...req.body}

    await fsWriter(users);

    res.status(200).json({
        message: 'User has been updated'
    })
})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const users = await fsReader();

    users.splice(+userId, 1);

    await fsWriter(users);

    res.status(203).json({
        message: 'User has been deleted',
    })
})