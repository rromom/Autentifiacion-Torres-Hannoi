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
    layoutsDir: __dirname + '/views/layouts',
}));

// Routes
app.use((req, res, next) => {
    next();
});

app.use(require('./server/routes/routes-index'))



// app.get('/', (req, res) => {
//     res.render('main', { layout: 'index' });
// });
// app.get('/login', (req, res) => {

//     res.render('login', { layout: 'index' });
// });
// app.get('/register', (req, res) => {

//     res.render('register', { layout: 'index' });
// });

// app.get('/game', (req, res) => {

//     res.render('game', { layout: 'index' });
// });


app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}/`));