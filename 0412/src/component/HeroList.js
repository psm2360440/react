//HeroList.js : 백엔드 서버로부터 데이터를 가져온다.
//axios : 설치 필요

import React, { useState, useEffect } from "react";
import axios from "axios";

function HeroList(props){
    const [heroList, setHerolist] = useState([]);
    const [loading, setLoading] = useState(false); //데이터를 수신하면 true로 바뀜
    //useState함수가 값을 초기화를 해주면 해당 값을 저장할 변수와 해당값을 변경하는 함수를 반환함,
    //[] : 배열을 저장할 변수를 반환, 배열값을 반환할 함수 주소

    //첫번째 매개변수 : mount, update, unmount 시 호출됨.
    //[] : 변수들이 바뀔 때 호출됨.

    useEffect( ()=>{
        //서버에서 데ㅐ이터를 불러온다
        // console.log("나 호출된다!");
        // setHerolist( heroList.concat([
        //     {id: 1, name: "박선미", descr: "건강함"},
        //     {id: 2, name: "김보고", descr: "탁월함"},
        //     {id: 3, name: "김경점", descr: "장수함"}
        // ]))
        axios.get("http://localhost:9090/hero/list")
        .then( (res)=>{
            console.log(res);
            setHerolist(res.data);
            setLoading(true);

        })
        .catch((res, status, error)=>{
            console.log(status);
        })
    }, []);

    return(
        <div>
            <table>
                {
                    loading === true?
                    heroList.map ( (item, index)=>{
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.hero_name}</td>
                                <td>{item.hero_desc}</td>
                                <td>{item.wdate}</td>
                            </tr>
                        )

                    })
                    :""
                }
            </table>
        </div>
    )

}

export default HeroList;