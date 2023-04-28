const { response } = require('express');

const User = require('../models/user');
const Song = require('../models/song');
const Playlist = require('../models/playlist');

const getAll = async (req, res = response) => {


    const search = req.params.search;
    const regexp = new RegExp(search, 'i');


    const [users, songs, playlists] = await Promise.all([
        Song.find({ name: regexp }),
        User.find({ name: regexp }),
        Playlist.find({ name: regexp })
    ]);



    res.json({
        ok: true,
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

            res.json({
                ok: true,
                results: data
            });
            break;
        case 'playlists':
            data = await Playlist.find({ name: regexp })
                .populate('user', 'name img');

            res.json({
                ok: true,
                results: data
            })
            break;
        case 'users':
            data = await User.find({ name: regexp });
            res.json({
                ok: true,
                results: data
            })
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'not found'
            });
    }


    res.json({
        ok: true,
        results: data
    });
}
module.exports = { getAll, getCollection };