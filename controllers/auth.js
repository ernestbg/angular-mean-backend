const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { createJWT } = require('../helpers/jwt');

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
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'contact with admin'
        })

    }

}


module.exports = { login }