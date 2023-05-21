// Route: /api/comments
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getComments, createComment, updateComment, deleteComment } = require('../controllers/comments');
const router = Router();


router.get('/', getComments);
router.post('/',
    [
        validateJWT,
        check('text', 'text of comment required').not().isEmpty(),
        validateFields
    ],
    createComment);

router.put('/:id',
    [
        check('text', 'text of comment required').not().isEmpty(),
        validateFields
    ],
    updateComment);

router.delete('/:id', validateJWT, deleteComment);

module.exports = router;