const express = require('express');
const { dbConnection } = require('./database/config.js');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

const {rateLimiterUsingThirdParty } = require('./middlewares/rateLimiter.js');
const helmet = require("helmet")




//crear el servidor de express
const app = express();

app.use(helmet());




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
app.use('/api/nlp', require('./routes/nlp.js'));
app.use('/api/users', require('./routes/users.js'));
app.use('/api/playlists', require('./routes/playlists.js'));
app.use('/api/songs', require('./routes/songs.js'));
app.use('/api/login', require('./routes/auth.js'));
app.use('/api/all', require('./routes/searches.js'));
app.use('/api/upload', require('./routes/uploads.js'));
app.use('/api/comments', require('./routes/comments.js'));

app.use(rateLimiterUsingThirdParty);

app.listen(process.env.PORT, () => console.log('server running in port ' + process.env.PORT));






module.exports = app;