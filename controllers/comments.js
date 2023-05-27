const { response } = require('express');
const Comment = require('../models/comment');

const getCommentsByAlbum = async (req, res = response) => {

    console.log(req.params.albumId)
    const comments = await Comment.find({ albumId: req.params.albumId });
       console.log(comments)
        res.json({
            status: true,
            comments
        });
       
       
   
}
const createComment = async (req, res = response) => {

    const comment = new Comment(req.body);
    try {
        const commentDB = await comment.save();
        res.json({
            status: true,
            comment: commentDB
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'contact with admin'
        });
    }
}

const updateComment = async (req, res = response) => {

    const commentId = req.params.id;
    const uid = req.uid;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                status: false,
                message: 'comment not found'
            });
        }

        const commentChanges = {
            ...req.body,
            user: uid
        };

        const commentUpdated = await Comment.findByIdAndUpdate(commentId, commentChanges, { new: true });

        res.json({
            status: true,
            message: 'updateComment',
            comment: commentUpdated
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'server error'
        });
    }
}


const deleteComment = async (req, res = response) => {
    const id = req.params.id;
    try {
        const commentDB = await Comment.findById(id);
        if (!commentDB) {
            return res.status(404).json({
                status: false,
                message: 'comment not found'
            });
        }
        await Comment.findByIdAndDelete(id);
        res.json({
            status: true,
            message: 'comment deleted'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: 'contact with admin'
        });
    }
}



module.exports = { getCommentsByAlbum, createComment, updateComment, deleteComment };