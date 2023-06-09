// Route: /api/users
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, getUserById, createUser, updateUser, deleteUser, deleteFavouriteAlbum, deleteFavouriteArtists, updateFavouriteArtist, updateFavouriteAlbums } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT, validateAdminRole, validateAdminRoleOrSameUser } = require('../middlewares/validate-jwt');
const { rateLimiterUsingThirdParty } = require('../middlewares/rateLimiter');
const router = Router();


router.get('/', [validateJWT, rateLimiterUsingThirdParty], getUsers);
router.get('/:id', validateJWT, getUserById);

router.post('/',
    [
        check('name', 'name required').not().isEmpty(),
        check('password', 'password required').not().isEmpty(),
        check('email', 'email required').isEmail(),
        validateFields
    ],
    createUser);

router.put('/:id',
    [
        validateJWT,
        validateAdminRoleOrSameUser,
        check('name', 'name required').not().isEmpty(),
        check('role', 'role required').not().isEmpty(),
        check('email', 'email required').isEmail(),
        validateFields
    ],
    updateUser);

router.put('/favourite-artists/:id',
    validateJWT,
    updateFavouriteArtist);

router.put('/delete-favourite-artists/:id',
    deleteFavouriteArtists);

router.put('/favourite-albums/:id',
    validateJWT,
    updateFavouriteAlbums);

router.delete('/:id', [validateJWT, validateAdminRole], deleteUser);
router.delete('/:userId/favourite-albums/:albumId', validateJWT, deleteFavouriteAlbum);


module.exports = router;