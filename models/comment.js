const { Schema, model } = require('mongoose');

const CommentSchema = Schema({
    artistId: {
        type: String,     
    },
    albumId: {
        type: String,
    },
    text: {
        type: String, 
    }
});

CommentSchema.method('toJSON', function () {
    const { _v, ...object } = this.toObject(); 
    return object;

});

module.exports = model('Comment', CommentSchema);