const jwt = require('jsonwebtoken');

const createJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (error, token) => {

            if (error) {
                console.log(error);
                reject('cannot create JWT');
            } else {
                resolve(token)
            }
        });
    })
}

module.exports = { createJWT }