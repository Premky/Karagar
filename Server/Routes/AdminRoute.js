import express from 'express'
import con from '../Utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt' //Toencrypt the password
import multer from 'multer' //For File Handling
import path from 'path'
// import { Upload } from 'react-bootstrap-icons'
import verifyToken from '../Middleware/verifyuser.js'
import NepaliDate from 'nepali-datetime'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { promisify } from 'util';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.memoryStorage(); //you can change this to diskstorege if needed
const upload = multer({storage:storage});

const router = express.Router()
const fy = new NepaliDate().format('YYYY'); //Support for filter
const fy_date= fy+'-4-1'

const query = promisify(con.query).bind(con);

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

router.post('/add_employee', upload.single('photo'), async(req, res)=>{
    //Access regular form fields
    const {emp_id, name_np, name, gender, rank_id, merit_no, contact, email,is_active, remarks}=req.body;
    const updated_by =1;
    const created_by =1;
    let photo='';
    console.log(req.file)

    if (!req.file) {       
        // return res.status(400).json({ Status: false, Error: 'Photo is required' });
    } else {
       const photo=req.file.path;
    }
    const sql = `INSERT INTO employe (emp_id, name, name_np, gender, rank_id, merit_no, contact, email, photo, updated_by, created_by, is_active, remarks) 
                    VALUES (?)`;
    const values = [
        emp_id, name, name_np, gender, rank_id, merit_no, contact, email, photo, updated_by, created_by, is_active, remarks
    ];
    console.log(values)
    try{
        const result = await query(sql, [values]);
        return res.json({Status: true, Result: result});
    } catch(err){
        console.error('Database error', err);
        return res.status(500).json({Status:false, Error: 'Internal Server Error'})
    }
})



export { router as adminRouter }