import express from 'express'
import con from '../Utils/db.js'
// import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt' //Toencrypt the password
import multer from 'multer' //For File Handling
import path from 'path'
// import { Upload } from 'react-bootstrap-icons'
import verifyToken from '../Middleware/verifyuser.js'
import NepaliDate from 'nepali-datetime'
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router()
const fy = new NepaliDate().format('YYYY'); //Support for filter
const fy_date = fy + '-4-1'

router.post('/login', (req, res) => {

})

router.get('/employee', async (req, res) => {
    const sql = 'SELECT * FROM employe';
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ Status: false, Error: 'Internal Server Error' });
        }
        // console.log(result);
        return res.json({ Status: true, Result: result });
    });
});


router.get('/employee1', (req, res) => {

    // console.log(officeid, );
    const sql = "SELECT * FROM employe";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/office', (req, res)=>{
    const sql = "SELECT * FROM office WHERE display=1";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

export { router as displayRouter }