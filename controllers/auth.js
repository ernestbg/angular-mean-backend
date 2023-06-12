const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { createJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenu } = require('../helpers/frontend-menu');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });

        if (!userDB) {
            res.status(404).json({
                status: false,
                message: 'email not found'
            });
        }

        //verify password
        const validPassword = bcryptjs.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                status: false,
                message: 'not a valid password'
            });
        }

        
        // Generar JWT
        const token = await createJWT(userDB.id);
        res.json({
            status: true,
            token,
            menu: getMenu(userDB.role),
            id: userDB.id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'contact with admin'
        });
    }
}

const googleSignIn = async (req, res = response) => {

    try {
        const { email, name, picture } = await googleVerify(req.body.token);

        const userDB = await User.findOne({ email });
        let user;

        if (!userDB) {
            user = new User({
                name,
                email,
                password: '__',
                img: picture,
                google: true
            });
        } else {
            user = userDB;
            user.google = true;
        }
        console.log(user.id)
        await user.save();
        const token = await createJWT(user.id);

        res.json({
            status: true,
            token,
            menu: getMenu(user.role)
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: 'not a valid google token'
        });
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const token = await createJWT(uid);
    const user = await User.findById(uid);
    res.json({
        status: true,
        token,
        user,
        menu: getMenu(user.role)
    });
}

module.exports = { login, googleSignIn, renewToken }