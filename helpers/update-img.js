const fs = require('fs');
const Playlist = require('../models/playlist');
const Song = require('../models/song');
const User = require('../models/user');

const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

let oldPath = '';

const updateImg = async (type, id, filename) => {

    switch (type) {
        case 'playlists':
            const playlist = await Playlist.findById(id);
            if (!playlist) {
                return false;
            }

            oldPath = `./uploads/playlists/${playlist.img}`;
            deleteImage(oldPath);
            playlist.img = filename;
            await playlist.save();
            return true;

        case 'users':
            const user = await User.findById(id);
            if (!user) {
                return false;
            }

            oldPath = `./uploads/users/${user.img}`;
            deleteImage(oldPath);
            user.img = filename;
            await user.save();
            return true;

        case 'songs':
            const song = await Song.findById(id);
            if (!song) {
                return false;
            }

            oldPath = `./uploads/songs/${song.img}`;
            deleteImage(oldPath);
            song.img = filename;
            await song.save();
            return true;
    }

}



module.exports = { updateImg };