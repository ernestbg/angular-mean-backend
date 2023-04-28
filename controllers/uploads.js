const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require("../helpers/update-img");


const fileUpload = (req, res = response) => {

    const { tipe, id } = req.params;

    const validTipes = ['playlists', 'users'];
    if (!validTipes.includes(tipe)) {
        return res.status(400).json({
            ok: false,
            msg: 'must be user, song or playlist'
        });
    }




    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    // Procesar el archivo
    const file = req.files.img;
    const nameCutted = file.name.split('.');
    const fileExtension = nameCutted[nameCutted.length - 1];

    // Validar extensiones
    const validExtensions = ['jpg', 'jpeg', 'png'];
    if (!validExtensions.includes(fileExtension)) {

        return res.status(400).json({
            ok: false,
            msg: 'Not a valid file extension.'
        });
    }

    // Generar id para nombre del archivo
    const filename = `${uuidv4()}.${fileExtension}`;


    // Path para guardar la imagen
    const uploadPath = `./uploads/${tipe}/${filename}`;
    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'error uploading file'
            });
        }


        // Update DB
        updateImg(tipe, id, filename);




        res.json({
            ok: true,
            msg: 'file uploaded',
            filename
        });
    });
}

const returnImg = (req, res = response) => {
    const tipe = req.params.tipe;
    const photo = req.params.photo;

    const pathImg = path.join(__dirname, `../uploads/${tipe}/${photo}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg=path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }



}

module.exports = { fileUpload, returnImg };