const { response } = require('express');
const Playlist = require('../models/playlist');

const getPlaylists = async (req, res = response) => {
    

    const playlists= await Playlist.find().populate('user', 'name img');
    
    res.json({
        ok: true,
        playlists
    });
}
const createPlaylist = async (req, res = response) => {


    const uid = req.uid;
    const playlist = new Playlist({
        user: uid,
        ...req.body
    });

    try {
        const playlistDB=  await playlist.save();

        res.json({
            ok: true,
            playlist: playlistDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'contact with admin'
        });
    }
}
const updatePlaylist = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'updatePlaylist'
    });
}
const deletePlaylist = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deletePlaylist'
    });
}



module.exports = { getPlaylists, createPlaylist, updatePlaylist, deletePlaylist };