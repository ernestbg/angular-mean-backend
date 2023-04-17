const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('Connected to DB');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error trying to connect to DB')
    }
}

module.exports = {
    dbConnection
}