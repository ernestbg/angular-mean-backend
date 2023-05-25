const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJWT = (req, res, next) => {
    
    // Leer token
    const token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            status: false,
            message: 'missing token'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            status: '401',
            message: 'not a valid token'
        });
    }
}

const validateAdminRole = async (req, res, next) => {
    const uid = req.uid;

    try {

        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                status: '404',
                message: 'User not found'
            });
        }
        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                status: '403',
                message: 'Unauthorized'
            });
        }
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: '500',
            message: 'contact with admin'
        });
    }
}

const validateAdminRoleOrSameUser = async (req, res, next) => {
    const uid = req.uid;
    const id = req.params.id;

    try {

        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                status: '404',
                message: 'User not found'
            });
        }
        if (userDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                status: '403',
                message: 'Unauthorized'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: '500',
            message: 'contact with admin'
        });
    }
}

module.exports = { validateJWT, validateAdminRole, validateAdminRoleOrSameUser };