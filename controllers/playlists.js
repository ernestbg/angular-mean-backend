const { response } = require('express');
const Playlist = require('../models/playlist');

const getPlaylists = async (req, res = response) => {


    const playlists = await Playlist.find().populate('user', 'name img');

    res.json({
        status: true,
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
        const playlistDB = await playlist.save();

        res.json({
            status: true,
            playlist: playlistDB
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'contact with admin'
        });
    }
}

const updatePlaylist = async (req, res = response) => {

    const playlistId = req.params.id;
    const uid = req.uid;

    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({
                status: false,
                msg: 'playlist not found'
            });
        }

        const playlistChanges = {
            ...req.body,
            user: uid
        };

        const playlistUpdated = await Playlist.findByIdAndUpdate(playlistId, playlistChanges, {new:true});

        res.json({
            status: true,
            msg: 'updatePlaylist',
            playlist: playlistUpdated
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: 'server error'
        });
    }
}


const deletePlaylist = async (req, res = response) => {

    const id = req.params.id;
    try {
        const playlistDB = await Playlist.findById(id);

        if (!playlistDB) {
            return res.status(404).json({
                status: false,
                msg: 'playlist not found'
            });
        }

        await Playlist.findByIdAndDelete(id);

        res.json({
            status: true,
            msg: 'playlist deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            msg: 'contact with admin'
        });
    }
}



module.exports = { getPlaylists, createPlaylist, updatePlaylist, deletePlaylist };