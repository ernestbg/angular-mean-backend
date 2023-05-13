// Route: /api/songs
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getSongs, getSongById, createSong, updateSong, deleteSong } = require('../controllers/songs');
const router = Router();


router.get('/', getSongs);
router.post('/',
    [
        validateJWT,
        check('name', 'name of song required').not().isEmpty(),
        check('playlist', 'playlist id not valid').isMongoId(),
        validateFields
    ],
    createSong);

router.put('/:id',
    [
        check('name', 'name of song required').not().isEmpty(),
        validateFields
    ],
    updateSong);

router.delete('/:id', validateJWT, deleteSong);

router.get('/:id', validateJWT, getSongById);

module.exports = router;