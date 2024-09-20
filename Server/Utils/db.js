// import mysql from 'mysql'

import mysql from 'mysql2';

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
const con = mysql.createConnection({
    host:'prem-prem.d.aivencloud.com',
    port:'22706',
    // auth_type:'config',
    user:'karagar_sankhuwasabha',    
    password:'AVNS_enpVvs-a73u5I3Trd4M',
    // extension:'mysqli',
    database:'Karagar'
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