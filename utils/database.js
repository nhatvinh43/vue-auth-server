const mongoose = require('mongoose');

const initDatabase = () => 
{
    mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
    }).then(() =>
    {
        console.log('DB Connected');
    }).catch((e) =>
    {
        console.log(e);
    });
}

module.exports = {
    initDatabase,
}