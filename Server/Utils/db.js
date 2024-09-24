// import mysql from 'mysql'

import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// const con = mysql.createConnection({
//     host:'localhost',
//     user:'software',    
//     password:'Mark3@Rifile',
//     database:'kppo_program'
// })

// const con = mysql.createConnection({
//     host:'localhost',
//     user:'root',    
//     password:'',
//     database:'karagar'
// })

//This uses mysql2
console.log('variables:', process.env.DB_HOST, ' ', process.env.DB_PORT, '', process.env.DB_USER, '' , process.env.DB_PASSWORD, ' ', process.env.DB_NAME)
const con = mysql.createConnection({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,    
    user:process.env.DB_USER,    
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    ssl:{
        rejectUnauthorized:false,
    }
})

con.connect(function(err){
    if(err){
        console.log(err)
        console.log("Connection Error")
    }
    else{
        console.log("Connected")
    }
})

export default con;
