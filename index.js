const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

var app = express();
const port = 1997;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'ejs');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'saitama',
    password: 'abc123',
    database: 'kokopedia',
    port: 3306
});

app.get('/', (req, res) => {
    res.send('<h1>Selamat Datang!</h1>');
});

app.get('/home', (req, res) => {
    var person = { nama: req.query.nama, umur: req.query.usia }
    res.render('satu', { namaWeb: req.query.website, person});
});

app.get('/home/:nama', (req, res) => {
    var person = { nama: 'Baron', umur: 21 }
    res.render('satu', { namaWeb: req.params.nama, person });
});

app.get('/kucing/:jenis', (req,res) => {
    res.send('<h1>Ini kucing jenis ' + req.params.jenis + '</h1>');
});

app.get('/contact', (req, res) => {
    res.render('formulir', { person:{ nama: '', usia: 0}})
});

app.post('/contact', (req, res) => {
    console.log(req.body);
    res.render('formulir', { person:{ nama: req.body.namaLengkap, usia: req.body.umur }})
});

app.get('/karyawandancab', (req, res) => {
    var sql1 = `select k.id as idKaryawan, k.Nama as NamaKaryawan, 
                Umur, Jabatan, Gaji, Status, NoTelephone, 
                c.Nama as NamaCabang 
                from karyawan k 
                join cabang c
                on k.CabangId = c.id;`;
    var sql2 = 'select * from cabang;';
    conn.query(sql1,(err1,results1) => {
        if(err1) throw err1;
        
        conn.query(sql2, (err2, results2) => {
            if(err2) throw err2;

            res.send({ listKaryawan: results1, listCabang: results2 });
        })
    })
});

app.get('/searchkaryawan', (req, res) => {
    const { namakaryawan, namacabang } = req.query;
    var sql = `select k.id as idKaryawan, k.Nama as NamaKaryawan, 
                Umur, Jabatan, Gaji, Status, NoTelephone, 
                c.Nama as NamaCabang 
                from karyawan k 
                join cabang c
                on k.CabangId = c.id
                where k.Nama Like '%${namakaryawan}%'
                and c.Nama Like '%${namacabang}%';`;
    conn.query(sql,(err,results) => {
        if(err) throw err;  

        res.send(results);
    })
});

app.post('/karyawan', (req, res) => {
    const { nama, umur, jabatan, gaji, status, notelp, cabangid } = req.body;
    var data = { 
        Nama: nama,
        Umur: umur,
        Jabatan: jabatan,
        Gaji: gaji,
        Status: status,
        NoTelephone: notelp,
        CabangId: cabangid
    };
    var sql = 'INSERT INTO karyawan SET ?';
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        console.log(results);
        var sql1 = `select k.id as idKaryawan, k.Nama as NamaKaryawan, 
                Umur, Jabatan, Gaji, Status, NoTelephone, 
                c.Nama as NamaCabang 
                from karyawan k 
                join cabang c
                on k.CabangId = c.id;`;
        conn.query(sql1, (err1, results1) => {
            if(err1) throw err1;
            
            res.send(results1);
        })
    })
});

app.delete('/karyawan/:id', (req, res) => {
    var sql = 'DELETE FROM karyawan Where id = ' + req.params.id;
    conn.query(sql,(err, results) => {
        if(err) throw err;
        console.log(results);
        var sql1 = `select k.id as idKaryawan, k.Nama as NamaKaryawan, 
                Umur, Jabatan, Gaji, Status, NoTelephone, 
                c.Nama as NamaCabang 
                from karyawan k 
                join cabang c
                on k.CabangId = c.id;`;
        conn.query(sql1, (err1, results1) => {
            if(err1) throw err1;
            
            res.send(results1);
        })
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));