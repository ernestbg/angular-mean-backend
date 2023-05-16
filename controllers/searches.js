const { response } = require('express');
const User = require('../models/user');
const Song = require('../models/song');
const Playlist = require('../models/playlist');

const getAll = async (req, res = response) => {
    const search = req.params.search;
    const regexp = new RegExp(search, 'i');
    const [users, songs, playlists] = await Promise.all([
        User.find({ name: regexp }),
        Song.find({ name: regexp }),
        Playlist.find({ name: regexp })
    ]);
    res.json({
        status: true,
        users,
        songs,
        playlists
    });
}

const getCollection = async (req, res = response) => {
    const table = req.params.table;
    const search = req.params.search;
    const regexp = new RegExp(search, 'i');

    let data = [];

    switch (table) {
        case 'songs':
            data = await Song.find({ name: regexp })
                .populate('user', 'name img')
                .populate('playlist', 'name img');
            break;
        case 'playlists':
            data = await Playlist.find({ name: regexp })
                .populate('user', 'name img');
            break;
        case 'users':
            data = await User.find({ name: regexp });
            break;
        default:
            return res.status(400).json({
                status: false,
                msg: 'not found'
            });
    }
    res.json({
        status: true,
        results: data
    });
}

module.exports = { getAll, getCollection };