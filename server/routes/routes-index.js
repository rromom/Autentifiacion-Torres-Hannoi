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
    console.log("llega");
    let body = req.body;
    let sql = 'SELECT * FROM `usuario` WHERE `email_user`="' + body.email + '" AND `password_user`="' + body.password + '" AND `id_figura`=' + body.figure + ' AND `number_user`=' + body.disk;
    let result = await pool.query(sql);
    let texto;
    if (result.length == 1) {
        texto = "WELCOME"
        res.redirect(`/sesion?text=${texto}&user=${result[0].nick_user}`);
    } else {
        req.flash('error', 'Credenciales no validas');
        res.redirect('/login');
    }
});
router.get('/sesion', (req, res) => {
    res.render('sesion', { layout: 'index', texto: req.query.text, user: req.query.user });
})
router.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log(req.body);

    try {
        //TODO: Hacer logeo
        console.log(req.body)
        throw new Error('sas')

    } catch (error) {
        req.flash('error', 'Error en el servidor');
        res.redirect('/login')
    }

})


router.get('/register', async(req, res) => {

    let consult = await consulta();

    res.render('register', { layout: 'index', genero: consult.genero, figura: consult.figura, etnia: consult.etnia });



});

router.post('/register', async(req = request, res = response) => {
    let consult = await consulta();
    let body = req.body;
    let sql2 = 'SELECT `email_user`,`nick_user` FROM `usuario` WHERE `email_user`="' + body.email + '" OR `nick_user`="' + body.nickname + '"';
    const result2 = await pool.query(sql2);
    let errores = {}
    if (result2.length >= 1) {
        result2.map(row => {
            if (row.email_user == body.email) {
                errores.err_email = "correo ya registrado";
            }
            if (row.nick_user == body.nickname) {
                errores.err_nick = "Nickname ya resgistrado";
            }

        });
    }
    //Valdiar cedula
    let flag = validar_cedula(body.cedula);
    if (!flag) {
        errores.err_ci = "Cedula no valida";
    }
    flag = validar_clave(body.pass1, body.pass2);
    if (!flag) {
        errores.err_pass = "Las constraseñas no coinciden";
    }

    if (Object.keys(errores).length === 0) {
        let insert = 'INSERT INTO `usuario`(`email_user`, `nick_user`, `id_etnia`, `id_gen`, `id_figura`, `names_user`, `last_user`, `ci_user`, `password_user`, `number_user`, `country_user`, `province_user`, `sector_user`, `phone_user`, `edad_user`) VALUES ' +
            '("' + body.email + '","' + body.nickname + '",' + body.etn + ',' + body.genre + ',' + body.fig + ',"' + body.name + '","' + body.lastname + '","' + body.cedula + '","' + body.pass1 + '",' + body.disk + ',"' + body.country + '","' + body.prov + '","' + body.city + '","' + body.phone + '",' + body.year + ')';
        let insertar = await pool.query(insert);
        res.redirect('/login');
    } else {
        res.render('register', {
            layout: 'index',
            genero: consult.genero,
            figura: consult.figura,
            etnia: consult.etnia,
            err_email: errores.err_email,
            err_nick: errores.err_nick,
            err_ci: errores.err_ci,
            err_pass: errores.err_pass
        });
    }
})

router.get('/game', (req, res) => {

    res.render('game', { layout: 'index' });
});

const consulta = async() => {
    let sql = 'SELECT `id_gen`,`name_gen` FROM `genero`';
    let sql1 = 'SELECT `id_figura`,`name_figura` FROM `figura`'
    let sql2 = 'SELECT `id_etnia`,`name_etnia` FROM `etnia`';
    const result = await pool.query(sql)
    const result1 = await pool.query(sql1);
    const result2 = await pool.query(sql2);
    let genero = [];
    let figura = [];
    let etnia = []
    result.map((row => {
        genero.push({ id: row.id_gen, gen: row.name_gen })
    }));
    result1.map((row => {
        figura.push({ id: row.id_figura, fig: row.name_figura })
    }));
    result2.map((row => {
        etnia.push({ id: row.id_etnia, etn: row.name_etnia });
    }));

    return { genero, figura, etnia };
}


const validar_cedula = (cedula) => {

    //Preguntamos si la cedula consta de 10 digitos
    if (cedula.length == 10) {

        //Obtenemos el digito de la region que sonlos dos primeros digitos
        var digito_region = cedula.substring(0, 2);

        //Pregunto si la region existe ecuador se divide en 24 regiones
        if (digito_region >= 1 && digito_region <= 24) {

            // Extraigo el ultimo digito
            var ultimo_digito = cedula.substring(9, 10);

            //Agrupo todos los pares y los sumo
            var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

            //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
            var numero1 = cedula.substring(0, 1);
            var numero1 = (numero1 * 2);
            if (numero1 > 9) { var numero1 = (numero1 - 9); }

            var numero3 = cedula.substring(2, 3);
            var numero3 = (numero3 * 2);
            if (numero3 > 9) { var numero3 = (numero3 - 9); }

            var numero5 = cedula.substring(4, 5);
            var numero5 = (numero5 * 2);
            if (numero5 > 9) { var numero5 = (numero5 - 9); }

            var numero7 = cedula.substring(6, 7);
            var numero7 = (numero7 * 2);
            if (numero7 > 9) { var numero7 = (numero7 - 9); }

            var numero9 = cedula.substring(8, 9);
            var numero9 = (numero9 * 2);
            if (numero9 > 9) { var numero9 = (numero9 - 9); }

            var impares = numero1 + numero3 + numero5 + numero7 + numero9;

            //Suma total
            var suma_total = (pares + impares);

            //extraemos el primero digito
            var primer_digito_suma = String(suma_total).substring(0, 1);

            //Obtenemos la decena inmediata
            var decena = (parseInt(primer_digito_suma) + 1) * 10;

            //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
            var digito_validador = decena - suma_total;

            //Si el digito validador es = a 10 toma el valor de 0
            if (digito_validador == 10)
                var digito_validador = 0;

            //Validamos que el digito validador sea igual al de la cedula
            if (digito_validador == ultimo_digito) {
                return true;
            } else {
                return false;
            }

        } else {
            // imprimimos en consola si la region no pertenece
            return false;
        }
    } else {
        //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
        return false;
    }
};
const validar_clave = (pass1, pass2) => {
    if (pass1 === pass2) {
        return true;
    }
    return false;
}

module.exports = router;