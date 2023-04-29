// Path: '/api/login'

const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');


const router = Router();

router.post('/',
    [
        check('password', 'password required').not().isEmpty(),
        check('email', 'email required').isEmail(),
        validateFields
    ],
    login)

router.post('/google',
    [     
        check('token', 'token required').not().isEmpty(),
        validateFields
    ],
    googleSignIn)


module.exports = router;