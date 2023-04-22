const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();


//crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//lectura y parseo del body
app.use(express.json());


//Conexion BD
dbConnection();

app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => console.log('server running in port' + process.env.PORT));
