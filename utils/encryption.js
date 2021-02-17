const bcrypt = require('bcryptjs');

const GEN_SALT = 10;
const salt = bcrypt.genSaltSync(GEN_SALT);

const encryptPassword = (password) =>
{
    const encrypted = bcrypt.hashSync(password, salt);
    return encrypted;
}

const comparePassword = (password, hash) =>
{
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    encryptPassword,
    comparePassword,
}