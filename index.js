const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();


//crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());



//Conexion BD
dbConnection();


//routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'prueba'
    })
});

app.listen(process.env.PORT, () => console.log('server running in port'+ process.env.PORT));
