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

const updateImg = async (tipe, id, filename) => {


    switch (tipe) {
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
            break;

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
            break;
    }

}



module.exports = { updateImg };