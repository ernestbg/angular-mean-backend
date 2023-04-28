const { Schema, model } = require('mongoose');

const PlaylistSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    //{collection:'Playlist'}
)

PlaylistSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Playlist', PlaylistSchema);