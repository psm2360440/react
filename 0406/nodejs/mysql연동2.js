var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "user01",
    password: "1234",
    database: "mydb",
    port: 3306
});

//디비와 연결을 한다.
pool.getConnection( (err, connection)=>{
    //디비와 연결을 성공하면 매개변수로 전달된 함수가 호출된다.
    //err : 디비와 연결 실패 시, 처리
    if(err){

        console.log( "err" );
        return;
    }

    //연결 성공 시 연결 객체 connection을 전달한다
    //연결 객체
    console.log("connection success");
    sql = `
        insert into tb_board(title, writer, contents, wdate)
        values(?,?,?,now())
        `;
    let params = ['제목3', '최우식','내용3'];
    connection.query(sql, params, (err, rows)=>{
        if(err)
            console.log("err");
        else
            console.log("insert성공" );
        // connection.release(); //연결해제

        sql = "select * from tb_board";
        connection.query(sql, params, (err, rows)=>{
            if(err)
                console.log("err");
            else
                console.log( rows );
            // connection.release(); //연결해제
            //여기에 select sql문이 위치하면 insert후에 select하게 되지만
            //무한 콜백 지옥의 상태가 될 수 있다.
        }) 

    })

});
console.log("end");