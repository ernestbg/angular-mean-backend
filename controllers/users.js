const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const user = require('../models/user');
const { createJWT } = require('../helpers/jwt');


const getUsers = async (req, res) => {

    const from = Number(req.query.from) || 0;
    console.log(from);

    // const users = await User
    //     .find({}, 'name email role google')
    //     .skip(from)
    //     .limit(5);

    // const total=await User.count();

    const [users, total] = await Promise.all([
        User
            .find({}, 'name email role google img')
            .skip(from)
            .limit(5),
        User.countDocuments()
    ]);

    res.json(
        {
            ok: true,
            users,
            total
        });
}

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: "el correo ya está registrado"
            });
        }
        const user = new User(req.body);

        //Encriptar contraseñas
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        // Save user
        await user.save();

        // Generar JWT
        const token = await createJWT(user.id);

        res.json(
            {
                ok: true,
                user,
                token
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error en el servidor'
        });
    }
}



const updateUser = async (req, res = response) => {
    const uid = req.params.id;
    const { name, role, email } = req.body;

    try {
        const userDB = await user.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'user not found'
            });
        }

        const { password, google, email, ...fields } = req.body;

        if (userDB.email !== email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    ok: false,
                    msg: 'el email ya esta registrado'
                });
            }
        }
        fields.email = email;

        const userUpdated = await User.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            user: userUpdated
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error en el update'
        });
    }
}


const deleteUser = async (req, res = response) => {

    const uid = req.params.id;
    try {

        const userDB = await user.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'user not found'
            });
        }

        await User.findByIdAndDelete(uid)

        res.json({
            ok: true,
            msg: 'user deleted'
        })

    } catch (error) {

        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'contact with admin'

        })
    }

}

module.exports = { getUsers, createUser, updateUser, deleteUser }