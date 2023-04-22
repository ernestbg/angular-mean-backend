// Path: '/api/login'

const { Router } = require('express');
const { login } = require('../controllers/auth');
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

module.exports = router;