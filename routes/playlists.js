// Route: /api/playlists
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getPlaylists, createPlaylist, updatePlaylist, deletePlaylist } = require('../controllers/playlists')
const router = Router();


router.get('/', getPlaylists);
router.post('/',
    [
        validateJWT,
        check('name', 'names of playlist required').not().isEmpty(),
        validateFields
    ],
    createPlaylist);

router.put('/:id',
    [
        check('name', 'names of playlist required').not().isEmpty(),
        validateFields
    ],
    updatePlaylist);

router.delete('/:id', validateJWT, deletePlaylist);


module.exports = router;