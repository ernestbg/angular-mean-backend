const { response } = require('express');
const Song = require('../models/song');

const getSongs = async (req, res = response) => {

    const songs = await Song.find().populate( 'user', 'name img').populate('playlist', 'name img');
    res.json({
        ok: true,
        songs
    });
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

const updateSong = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'updateSong'
    });
}
const deleteSong = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteSong'
    });
}



module.exports = { getSongs, createSong, updateSong, deleteSong };