const express = require('expres');
const router = express.Router();

const pool = require('../database');


router.get('/add', (req, res) => {
    res.render('usuario/add');
});


router.post('/add', (req, res) => {

    console.log(req.body);
    res.send('recived');

});

module.exports = router;