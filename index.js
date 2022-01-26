const express = require('express');
const env = require('dotenv');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const handlebars = require('express-handlebars');
const app = express();


env.config();
app.use(morgan('dev'));
app.use(session({ secret: 'super-secret-key', resave: true, saveUninitialized: true }))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash())



app.use(express.static('public'))


app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars({
    defaultLayout: false,
    layoutsDir: __dirname + '/views/layouts',
}));

// Routes
app.use((req, res, next) => {
    next();
});

app.use(require('./server/routes/routes-index'))




app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`));