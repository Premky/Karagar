import mysql from 'mysql'
// import mysql from 'mysql2/promise';

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

const con = mysql.createConnection({
    host:'prem-prem.d.aivencloud.com',
    port:'22706',
    user:'karagar_sankhuwasabha',    
    password:'AVNS_enpVvs-a73u5I3Trd4M',
    database:'Karagar'
})
con.connect(function(err){
    if(err){
        console.log("Connection Error")
    }
    else{
        console.log("Connected")
    }
})

export default con;
