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
// const { promisify } = require('util');

const fy = new NepaliDate().format('YYYY'); //Support for filter
const fy_date = fy + '-4-1'

import { promisify } from 'util';
const query = promisify(con.query).bind(con);

router.post('/login', (req, res) => {

})

router.get('/employee', async (req, res) => {
    const sql = `SELECT e.*, r.rank_en_name, r.rank_np_name 
                FROM employe e 
                LEFT JOIN ranks r ON r.id = e.rank_id ORDER BY merit_no, is_active`;
    try {
        const result = await query(sql);
        // console.log(result);
        return res.json({ Status: true, Result: result });
    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ Status: false, Error: 'Internal Server Error' });
    }
});


router.get('/office', (req, res) => {
    const sql = "SELECT * FROM office WHERE display=1";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/ranks', async(req, res) => {
    const sql = "SELECT * FROM ranks";
    try {
        const result = await query(sql);
        // console.log(result);
        return res.json({ Status: true, Result: result });
    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ Status: false, Error: 'Internal Server Error' });
    }
});

router.get('/notices', async(req,res)=>{
    const sql = "SELECT * FROM notices";
    try{
        const result = await query(sql);
        return res.json({Status:true, Result: result});
    }catch(err){
        console.error('Database query error:', err);
        return res.status(500).json({ Status: false, Error: 'Internal Server Error' });
    }
})

export { router as displayRouter }