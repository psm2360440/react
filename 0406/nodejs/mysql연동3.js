var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "user01",
    password: "1234",
    database: "mydb",
    port: 3306
});

pool.getConnection( (err, connection)=>{

    if(err){

        console.log( "err" );
        return;
    }

    console.log("connection success");

    new Promise((resolve, reject)=>{
        sql = `
        insert into tb_board(title, writer, contents, wdate)
        values(?,?,?,now())
        `;
    let params = ['제목4', '박해일','내용4'];
    connection.query(sql, params, (err, rows)=>{
        if(err)
            reject("db 오류");  //catch로 이동
        else
            resolve("success" );  //then구문으로 이동
        });
    })
    .then( (result)=>{
        sql = "select * from tb_board";
        connection.query(sql, (err, rows)=>{
            if(err)
                console.log("err");
            else
                console.log( rows );
        });
    })
    .catch( (error)=>{
        console.log(error);
    });
});
console.log("end");