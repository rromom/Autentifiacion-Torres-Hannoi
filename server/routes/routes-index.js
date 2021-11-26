const { request, response } = require('express');
const express = require('express');
const pool = require('../database')

const router = express.Router();

router.get('/', (req, res) => {
    res.render('main', { layout: 'index' });
});

router.get('/login', (req, res) => {
    res.render('login', { layout: 'index', error: req.flash('error') });
});

router.post('/ingreso', async(req, res) => {
    const { email, psw } = req.body
    let sql = 'SELECT * FROM `usuario` WHERE `email_user`="' + email + '" AND `password_user`="' + psw+"\"";
    
    let result = await pool.query(sql);
    let texto;
    if (result.length == 1) {
        texto = "BIENVENIDO";
        res.render(`sesion`,{layout:'index',texto,nick:result[0].nick_user});
     } else {
         let errores={};
         errores.credencial='Credenciales no validas';
         res.render('login',{layout:'index',errores});
     }
});
router.get('/sesion', (req, res) => {
    res.render('sesion', { layout: 'index', texto: req.query.text, user: req.query.user });
})

router.get('/register', async(req, res) => {
    res.render('register',{layout:'index'});
});

router.post('/register', async(req = request, res = response) => {
    let {nickname,nombre,apellido,email,pwd} = req.body;
    let sql = "SELECT  `email_user`, `nick_user` FROM `usuario` Where email_user='"+email+"' OR nick_user='"+nickname+"'";
    const result = await pool.query(sql);
    let errores = {}
    if (result.length >= 1) {
        result.map(row => {
            if (row.email_user == email) {
                errores.err_email = "correo ya registrado";
            }
            if (row.nick_user == nickname) {
                errores.err_nick = "Nickname ya resgistrado";
            }
        });
    }
    
    if (Object.keys(errores).length === 0) {
        let insert = 'INSERT INTO `usuario`(`email_user`, `nick_user`,  `names_user`, `last_user`, `password_user`) VALUES ' +
            '("' + email + '","' +nickname + '","' +nombre + '","' +apellido+ '","' +pwd + '")';
        await pool.query(insert);
        res.redirect('/login');
    } else {
        res.render('register',{layout:'index',errores:errores,nombre,apellido});
    }
})

module.exports = router;