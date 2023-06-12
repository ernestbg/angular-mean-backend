const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { createJWT } = require('../helpers/jwt');
const { ObjectId } = require('mongodb');


const getUsers = async (req, res) => {

    const from = Number(req.query.from) || 0;

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

    res.json({
        status: true,
        users,
        total
    });
}

const getUserById = async (req, res = response) => {
    const uid = req.params.id;
    const query = { _id: new ObjectId(uid) };
    const user = await User.findById(query);
    res.json({
        status: true,
        user
    });

}

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({
                status: false,
                message: "el correo ya está registrado"
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

        res.json({
            status: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'error en el servidor'
        });
    }
}



const updateUser = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                status: false,
                message: 'user not found'
            });
        }

        const { password, google, email, ...fields } = req.body;
        if (userDB.email !== email) {

            const emailExists = await Usuario.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    status: false,
                    message: 'Ya existe un usuario con ese email'
                });
            }
        }
        if (!userDB.google) {
            fields.email = email;

        } else if (userDB.email !== email) {
            return res.status(400).json({
                status: false,
                message: 'Usuario de google no puede cambiar su correo'
            });
        }

        const userUpdated = await User.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            status: true,
            user: userUpdated
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'error en el update'
        });
    }
}

const updateFavouriteArtist = async (req, res = response) => {
    const uid = req.params.id;
    const favouriteArtist = req.body.favouriteArtist;
    const filtro = { _id: new ObjectId(uid) };
    const update = { $set: { favouriteArtist: favouriteArtist } };
    const result = await User.updateOne(filtro, update);
    res.json({
        status: true,
        result: result
    });
}

const updateFavouriteAlbums = async (req, res = response) => {
    const uid = req.params.id;
    const favouriteAlbums = req.body.favouriteAlbums;
    const result = await User.findByIdAndUpdate(
        uid,
        { $push: { favouriteAlbums: favouriteAlbums } },
        { new: true } // Opción para devolver el documento actualizado
    );
    res.json({
        status: true,
        result: result
    });
}



const deleteUser = async (req, res = response) => {

    const uid = req.params.id;
    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                status: false,
                message: 'user not found'
            });
        }

        await User.findByIdAndDelete(uid);

        res.json({
            status: true,
            message: 'user deleted'
        })

    } catch (error) {

        console.log(error);
        res.status(400).json({
            status: false,
            message: 'contact with admin'

        });
    }
}
const deleteFavouriteAlbum = async (req, res = response) => {

    const userId = req.params.userId;
    const albumId = req.params.albumId;

    try {
        const updatedDocument = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { favouriteAlbums: albumId } },
            { new: true }
        );

        console.log('Documento actualizado correctamente');
        console.log(updatedDocument);

        res.status(200).json({ message: 'Documento actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el documento:', error);
        res.status(500).json({ error: 'Error al actualizar el documento' });
    }
};
const deleteFavouriteArtists = async (req, res = response) => {

    const userId = req.params.id;
    console.log(userId)

    try {
        const updatedDocument = await User.updateOne(
            { _id: new ObjectId(userId) }, 
            { $unset: { favouriteArtist: 1 } }

        );

        console.log('Documento actualizado correctamente');
        console.log(updatedDocument);

        res.status(200).json({ message: 'Documento actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el documento:', error);
        res.status(500).json({ error: 'Error al actualizar el documento' });
    }
};



module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    updateFavouriteArtist,
    updateFavouriteAlbums,
    deleteUser,
    deleteFavouriteAlbum,
    deleteFavouriteArtists
}