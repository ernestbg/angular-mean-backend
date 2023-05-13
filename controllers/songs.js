const { response } = require('express');
const Song = require('../models/song');

const getSongs = async (req, res = response) => {

    const songs = await Song.find().populate('user', 'name img').populate('playlist', 'name img');
    res.json({
        ok: true,
        songs
    });
}

const getSongById = async (req, res = response) => {
    const songId = req.params.id;
    try {
        const song = await Song.findById(songId).populate('user', 'name img').populate('playlist', 'name img');
        res.json({
            ok: true,
            song
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: 'error'
        });
    }
}

const createSong = async (req, res = response) => {

    const uid = req.uid;
    const song = new Song({
        user: uid,
        ...req.body
    });

    try {
        const songDB = await song.save();
        res.json({
            ok: true,
            song: songDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contact with admin'
        });
    }
}

const updateSong = async (req, res = response) => {
    const songId = req.params.id;
    const uid = req.uid;

    try {
        const song = await Song.findById(songId);

        if (!song) {
            return res.status(404).json({
                ok: false,
                msg: 'song not found'
            });
        }

        const songChanges = {
            ...req.body,
            user: uid
        };

        const songUpdated = await Song.findByIdAndUpdate(songId, songChanges, { new: true });

        res.json({
            ok: true,
            msg: 'updateSong',
            song: songUpdated
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'server error'
        });
    }
}


const deleteSong = async (req, res = response) => {
    const id = req.params.id;
    try {
        const songDB = await Song.findById(id);

        if (!songDB) {
            return res.status(404).json({
                ok: false,
                msg: 'song not found'
            });
        }

        await Song.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'song deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'contact with admin'
        });
    }
}



module.exports = { getSongs, getSongById, createSong, updateSong, deleteSong };