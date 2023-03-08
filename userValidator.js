const userValidator = (name, age, gender, res) => {

    if (!name || name.length <= 2) {
        res.status(400).json('Name must be over 2 symbol')
    }
    if (!age || +age <= 0) {
        res.status(400).json('Age must be not lower 0')
    }
    if (!gender || (gender !== 'male' && gender !== 'female')) {
        res.status(400).json('Gender must be male or female')
    }
}

module.exports = {
    userValidator
}