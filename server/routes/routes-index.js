const { request, response } = require('express');
const express = require('express');
const pool = require('../database')

const router = express.Router();

const middleware = (req,res,next) =>{
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

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
    const { email, pwd} = req.body
    
    //  let sql = 'SELECT * FROM `usuario` WHERE `email_user`=? AND `password_user`=?';
    //  let result = await pool.query(sql,[`${email}`,`${pwd}`]);

    let sql = 'SELECT * FROM `usuario` WHERE `email_user`="' + email + '" AND `password_user`="' + pwd+'"';
    let result = await pool.query(sql);

    if (result.length == 1) {
        texto = "BIENVENIDO";
        req.session.user = result;
        res.redirect('/sesion');
     } else {
         let errores={};
         errores.credencial='Credenciales no validas';
         res.render('login',{layout:'index',errores});
     }
});

router.get('/sesion',middleware,(req, res) => {
    console.log(req.session.user)
    res.render('sesion', { layout: 'dashboard', texto: "BIENVENIDO", nick: req.session.user[0].nick_user, saldo:req.session.user[0].saldo_usuario, email:req.session.user[0].email_user });
})


router.post('/edit', middleware,async(req,res) => {
    let sql = "UPDATE usuario set saldo_usuario=? WHERE email_user=?"
    const result = await pool.query(sql,[req.body.saldo,`${req.session.user[0].email_user}`]);
    let sql1 = 'SELECT * FROM `usuario` WHERE `email_user`=?';
    const result1 = await pool.query(sql1,[`${req.session.user[0].email_user}`]);
    console.log(result1)
    req.session.user = result1;
    res.send("Actualizado")
})


router.get('/email',middleware,(req, res) => {
    console.log(req.session.user)
    res.render('email', { layout: 'dashboard'});
})

router.post('/edit/email',middleware, async(req , res) => {
    const {email}= req.body;
    let sql = "UPDATE usuario set email_user=? WHERE email_user=?"
    const result = await pool.query(sql,[ `${email}`, req.session.user[0].email_user]);
    req.session.user[0].email_user = email;
    req.session.destroy();
    res.redirect('/sesion');
})

router.get('/register', async(req, res) => {
    res.render('register',{layout:'index'});
});

router.post('/register', async(req = request, res = response) => {
    let {nickname,nombre,apellido,email,psw} = req.body;
    // let sql = "SELECT  `email_user`, `nick_user` FROM `usuario` Where email_user='"+email+"' OR nick_user='"+nickname+"'";
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
        let insert = 'INSERT INTO `usuario`(`email_user`, `nick_user`,  `names_user`, `last_user`, `password_user`,`saldo_usuario`) VALUES  ( ? , ? , ? , ? , ? ,?)';
        await pool.query(insert, [`${email}`,`${nickname}`,`${nombre}`,`${apellido}`,`${psw}`,`100`]);
        res.redirect('/login');
    } else {
        res.render('register',{layout:'index',errores:errores,nombre,apellido});
    }
})

module.exports = router;