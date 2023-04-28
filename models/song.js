const { Schema, model } = require('mongoose');

const SongSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    playlist: {
        type: Schema.Types.ObjectId,
        ref: 'Playlist',
        required: true
    }
}, { collection: 'Songs' })

SongSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;

});

module.exports = model('Song', SongSchema);