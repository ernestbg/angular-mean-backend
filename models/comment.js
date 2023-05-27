const { Schema, model } = require('mongoose');

const CommentSchema = Schema({
    artistId: {
        type: String,
    },
    text: {
        type: String,
    },
    albumId: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: new Date()
    }
});

CommentSchema.method('toJSON', function () {
    const { _v, ...object } = this.toObject();
    return object;

});

module.exports = model('Comment', CommentSchema);