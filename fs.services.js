const fs = require('node:fs/promises');
const path = require('path');

const usersPath = path.join(process.cwd(), 'users.json');
const fsReader = async () => {
    const data = await fs.readFile(usersPath);
    return JSON.parse(data.toString());
}

const fsWriter = async (user) => {
    await fs.writeFile(usersPath, JSON.stringify(user))
}

module.exports = {
    fsReader,
    fsWriter,
}