const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();


//crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());



// public folder
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());



app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.use(express.static(path.join(__dirname, 'public')));

//Conexion BD
dbConnection();
app.use('/api/nlp', require('./routes/nlp'));
app.use('/api/users', require('./routes/users'));
app.use('/api/playlists', require('./routes/playlists'));
app.use('/api/songs', require('./routes/songs'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/comments', require('./routes/comments'));


app.listen(process.env.PORT, () => console.log('server running in port ' + process.env.PORT));


module.exports = app;