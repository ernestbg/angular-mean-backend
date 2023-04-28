// api/upload/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, returnImg } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');


const router = Router();

router.use(expressFileUpload());

router.put('/:tipe/:id', validateJWT, fileUpload );
router.get('/:tipe/:photo', validateJWT, returnImg );


module.exports = router;

