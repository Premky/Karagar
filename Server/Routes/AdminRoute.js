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
const router = express.Router()
const fy = new NepaliDate().format('YYYY'); //Support for filter
const fy_date = fy + '-4-1'

// const storage = multer.memoryStorage(); //you can change this to diskstorege if needed
const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        const uploadDir = 'Public/Uploads';
        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir,{recursive:true});
        }
        callback(null,`${uniqueSuffix}_${sanitizedFilename}`);
    }
}); 

const sanitizedFilename = (filename)=>{
    return filename.replace(/[^a-z0-9.]/gi,'_').toLowerCase();
};
const upload = multer({ storage: storage });

const query = promisify(con.query).bind(con);


router.post('/add_employee', upload.single('photo'), async (req, res) => {
    //Access regular form fields
    const { emp_id, name_np, name, gender, rank_id, merit_no, contact, email, is_active, remarks } = req.body;
    const updated_by = 1;
    const created_by = 1;
    let photo = null;
    // console.log(req.file)

    if (req.file) {
        photo = req.file.path;
        console.log(req.file.path)
    } 

    const sql = `INSERT INTO employe (emp_id, name, name_np, gender, rank_id, merit_no, contact, email, photo, updated_by, created_by, is_active, remarks) 
                    VALUES (?)`;
    const values = [
        emp_id, name, name_np, gender, rank_id, merit_no, contact, email, photo, updated_by, created_by, is_active, remarks
    ];
    console.log(values)
    try {
        const result = await query(sql, [values]);
        return res.json({ Status: true, Result: result });
    } catch (err) {
        console.error('Database error', err);
        return res.status(500).json({ Status: false, Error: 'Internal Server Error' })
    }
})

router.put('/update_employee/:id', upload.single('photo'), async (req, res) => {
    const { emp_id, name_np, name, gender, rank_id, merit_no, contact, email, is_active, remarks } = req.body;
    const updated_by = 1; // Set this based on your application logic    
    const id = req.params.id; // Employee ID from the URL

    let oldPhoto = null;

    try {
        // First, retrieve the current photo path from the database
        const [currentEmployee] = await query('SELECT photo FROM employe WHERE id = ?', [id]);
        if (currentEmployee.length === 0) {
            return res.status(404).json({ Status: false, Error: 'Employee not found' });
        }else{
            console.log(currentEmployee)
            oldPhoto = currentEmployee.photo; // Get the current photo path            
        }

        // Determine the new photo path
        let photo = null;
        if (req.file) {
            photo = req.file.path; // Use the uploaded photo path
        }

        // Prepare the SQL query for updating
        const sql = `UPDATE employe 
                     SET emp_id = ?, 
                         name = ?, 
                         name_np = ?,  
                         gender = ?, 
                         rank_id = ?, 
                         merit_no = ?, 
                         contact = ?, 
                         email = ?, 
                         photo = COALESCE(?, photo), -- Keep old photo if new one is not provided
                         updated_by = ?, 
                         is_active = ?, 
                         remarks = ? 
                     WHERE id = ?`;

        // Prepare values for the SQL query
        const values = [
            emp_id, 
            name, 
            name_np, 
            gender, 
            rank_id, 
            merit_no, 
            contact, 
            email, 
            photo, // This can be null if no new photo is uploaded
            updated_by, 
            is_active, 
            remarks, 
            id // Employee ID for WHERE clause
        ];
        
        // Execute the update query
        const result = await query(sql, values);

        // If a new photo was uploaded, delete the old photo from the filesystem
        if (req.file && oldPhoto) {
            const fs = require('fs');
            fs.unlink(oldPhoto, (err) => {
                if (err) console.error('Error deleting old photo:', err);
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: false, Error: 'Employee not found' });
        }
        return res.json({ Status: true, Result: 'Employee updated successfully!' });
    } catch (err) {
        console.error('Database error', err);
        return res.status(500).json({ Status: false, Error: 'Internal Server Error' });
    }
});






export { router as adminRouter }