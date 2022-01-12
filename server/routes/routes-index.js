const { request, response } = require('express');
const express = require('express');
const pool = require('../database')

const router = express.Router();

router.get('/', (req, res) => {
    res.render('main', { layout: 'index',active1:'active'});
});

router.get('/creditos',(req,res)=>{
    res.render('creditos',{ layout:'index', active2:'active'});
})

router.get('/inversiones',(req,res)=>{
    res.render('inversiones',{ layout:'index', active3:'active'});
})

router.get('/servicios',(req,res)=>{
    res.render('servicios',{ layout:'index', active4:'active'});
})

router.get('/login', (req, res) => {
    res.render('login', { layout: 'index', error: req.flash('error') });
});

router.post('/ingreso', async(req, res) => {
    const { email, psw } = req.body
    
    let sql = 'SELECT * FROM `usuario` WHERE `email_user`=? AND `password_user`=?';
    let result = await pool.query(sql,[`${email}`,`${psw}`]);

    //let sql = 'SELECT * FROM `usuario` WHERE `email_user`="' + email + '" AND `password_user`="' + psw+"\"";
    //let result = await pool.query(sql);
    
    let texto;

    console.log(result.length);
    if (result.length == 1) {
        texto = "BIENVENIDO";
        res.render(`sesion`,{layout:'dashboard',texto,nick:result[0].nick_user});
     } else {
         let errores={};
         errores.credencial='Credenciales no validas';
         res.render('login',{layout:'index',errores});
     }
});
router.get('/sesion', (req, res) => {
    res.render('sesion', { layout: 'dashboard', texto: req.query.text, user: req.query.user });
})

router.get('/register', async(req, res) => {
    res.render('register',{layout:'index'});
});

router.post('/register', async(req = request, res = response) => {
    let {nickname,nombre,apellido,email,pwd} = req.body;
    //let sql = "SELECT  `email_user`, `nick_user` FROM `usuario` Where email_user='"+email+"' OR nick_user='"+nickname+"'";
    let sql = "SELECT  `email_user`, `nick_user` FROM `usuario` Where `email_user`=? OR `nick_user`=?";
    const result = await pool.query(sql,[`${email}`,`${nickname}`]);
    let errores = {}
    if (result.length == 1) {
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
        //let insert = 'INSERT INTO `usuario`(`email_user`, `nick_user`,  `names_user`, `last_user`, `password_user`) VALUES ' +
            //'("' + email + '","' +nickname + '","' +nombre + '","' +apellido+ '","' +pwd + '")';
            let insert = 'INSERT INTO `usuario`(`email_user`, `nick_user`,  `names_user`, `last_user`, `password_user`) VALUES  ( ? , ? , ? , ? , ? )';
        await pool.query(insert, [`${email}`,`${nickname}`,`${nombre}`,`${apellido}`,`${pwd}`]);
        res.redirect('/login');
    } else {
        res.render('register',{layout:'index',errores:errores,nombre,apellido});
    }
})

module.exports = router;