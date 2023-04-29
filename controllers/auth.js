const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { createJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });

        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: 'email not found'
            });
        }

        //verify password
        const validPassword = bcryptjs.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'not a valid password'
            });
        }

        console.log(userDB.id)
        // Generar JWT
        const token = await createJWT(userDB.id);
        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contact with admin'
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

        await user.save();

        const token = await createJWT(user.id);

        res.json({
            ok: true,
            email,
            name,
            picture,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'not a valid google token'
        });
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    const token = await createJWT(uid);

    res.json({
        ok: true,
        token
    });
}



module.exports = { login, googleSignIn, renewToken }