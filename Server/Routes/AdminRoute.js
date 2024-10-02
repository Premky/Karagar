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
// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadDir = 'Public/Uploads';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        callback(null, uploadDir); // Set the upload directory
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now(); // or use a library like uuid
        const sanitized = sanitizedFilename(file.originalname);
        const filename = `${uniqueSuffix}_${sanitized}`;
        callback(null, filename); // Set the filename
    }
});

// Function to sanitize filenames
const sanitizedFilename = (filename) => {
    return filename.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
};

const upload = multer({ storage: storage });

const query = promisify(con.query).bind(con);


router.post('/add_employee', upload.single('photo'), async (req, res) => {
    //Access regular form fields
    const { emp_id, name_np, name, gender, rank_id, merit_no, contact, email, is_active, remarks } = req.body;
    const updated_by = 1;
    const created_by = 1;
    const photo = null;
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
        } else {
            // console.log('line~81', currentEmployee)
            oldPhoto = currentEmployee // Get the current photo path            
        }

        // Determine the new photo path
        let photo = null;
        if (req.body.photo) {
            console.log('req_file:', req.body.photo)
            photo = req.file.path; // Use the uploaded photo path
        } else {
            photo = oldPhoto;
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
                         photo=?,
                         updated_by = ?, 
                         is_active = ?, 
                         remarks = ? 
                     WHERE id = ?`;
        //  photo = COALESCE(?, photo), -- Keep old photo if new one is not provided
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

router.post('/add_notice', upload.single('file'), async(req, res) => {
    const { date, end_date, title_np, is_popup, is_active, remarks } = req.body;
    const updated_by = 1;
    const created_by = 1;
    const filePath = req.file ? path.posix.join('Uploads', req.file.filename) : null; // Handle file upload path

    const sql = `INSERT INTO notices (date, end_date, subject, is_popup, is_active, file, remarks, updated_by, created_by)
        VALUES (?)`;

    const values = [
        date, end_date, title_np, is_popup, is_active, filePath, remarks, updated_by, created_by,
    ];

    try {
        const result = await query(sql, [values]);
        return res.json({ Status: true, Result: result });
    } catch (err) {
        console.error('Database error', err);
        return res.status(500).json({ Status: false, Error: 'Internal Server Error' });
    }
});

router.put('/update_notice/:id', upload.single('file'), async (req, res) => {
    const { id } = req.params;
    const { date, end_date, title_np, is_popup, is_active, remarks } = req.body;
    const updated_by = 1; // You can dynamically assign the user ID here
    let newFilePath = req.file ? path.posix.join( 'Uploads', req.file.filename) : null;
  
    try {
      // Fetch the current notice to check if a new file was uploaded or to keep the old file
      const checkNoticeSQL = 'SELECT file FROM notices WHERE id = ?';
      const existingNotice = await query(checkNoticeSQL, [id]);
  
      if (!existingNotice || existingNotice.length === 0) {
        return res.status(404).json({ Status: false, Result: 'Notice not found' });
      }
  
      let oldFilePath = existingNotice[0].file; // Store the old file path
      
      if (!newFilePath) {
        newFilePath = oldFilePath; // Keep the existing file if no new file is uploaded
      }
  
      // SQL for updating the notice
      const updateSQL = `
        UPDATE notices 
        SET date = ?, end_date = ?, subject = ?, is_popup = ?, is_active = ?, file = ?, remarks = ?, updated_by = ?
        WHERE id = ?
      `;
      const values = [date, end_date, title_np, is_popup, is_active, newFilePath, remarks, updated_by, id];
  
      const result = await query(updateSQL, values);
  
      if (result.affectedRows === 1) {
        // If a new file is uploaded and the old file exists, delete the old file
        if (req.file && oldFilePath && fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Delete the old file
        }
        return res.json({ Status: true, Result: 'Notice updated successfully and old file deleted!' });
      } else {
        return res.status(500).json({ Status: false, Result: 'Failed to update notice' });
      }
  
    } catch (err) {
      console.error('Error updating notice:', err);
      return res.status(500).json({ Status: false, Error: 'Internal Server Error' });
    }
  });
  
  



export { router as adminRouter }