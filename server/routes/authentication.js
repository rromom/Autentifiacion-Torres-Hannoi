const express = require('expres');
const router = express.Router();
const passport = require('passport');


router.get('/signup', (req, res) => {
    res.render('login')
});

router.post('/signup', (req, res) => {
    passport.authenticate('local.sigup', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true

    });
    res.render('')
});


router.get('/', (req, res) => {
    res.send('this is your profile');
});

module.exports = router;