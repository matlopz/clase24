const express = require('express');
const cors = require('cors')
const handlebars = require('express-handlebars');
const connectMongo = require('./db');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const initializedPassport = require('./config/passport.config');
const router = require('./router')();

const app = express();
app.use(cookieParser())
const hbs = handlebars.create({
 
    allowProtoPropertiesByDefault: true
});

app.use(cors());
// Middleware para procesar JSON 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', hbs.engine);
app.engine('handlebars', handlebars.engine({

    runtimeOptions: {
    
    allowProtoPropertiesByDefault: true,
    
    },
    
    }))
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

initializedPassport()
app.use(passport.initialize())
connectMongo()


app.use('/', router);

module.exports = app;
