import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { SERVERIP  } from '../../CommonUtil';
import {Link, useNavigate, useParams} from 'react-router-dom';


function BoardWrite(props){
    const {id} = useParams(); //보내는 쪽에서 json 객체로 보냄
    const history = useNavigate();
    const [heroName, setHeroName] = useState("");
    const [heroDesc, setHeroDesc] = useState("");
    
    useEffect (() =>{
        console.log("id : " + id);
        /*
        window.onload()의 역할을 하는 곳이 여기
        */
       
        async function loadData(id){
            let results = await axios.get(SERVERIP+"/hero/view/"+id);
            console.log( results.data.hero.hero_name);
            console.log( results.data.hero.hero_desc);

            setHeroName(results.data.hero.hero_name);
            setHeroDesc(results.data.hero.hero_desc);
            // alert("저장되었습니다!");
            // history('/board/list');

    }
    if ( id != undefined){
        loadData(id);
    }





    },[])
    const nameChange = (e)=>{
        setHeroName((e.target.value));
    } 
    
    const descChange = (e)=>{
        setHeroDesc((e.target.value));
    }

    const postData = ()=>{
        //데이터를 json으로 묶어서 보내야 한다.
        const data = {hero_name:heroName, hero_desc:heroDesc};
        axios.post(SERVERIP+"/hero/write", data)
        .then( (res)=>{
            console.log( res );
            alert("저장되었습니다!");
            history('/board/list');

        })
        .catch( (error)=>{
            console.log( error );
        })
    }

    return(
            <div className='container'>
                <h1>WRITE</h1>
                <table className="table table-hover " style={{marginTop: "30px"}}>
                    <colgroup>
                        <col style = {{width: "25%"}}/>
                        <col style = {{width:"*"}}/>
                    </colgroup>       
                    <tbody>
                        <tr>
                            <td>이름</td>
                            <td>
                                <div className="mb-3" style={{marginTop:"13px"}}>
                                    <input type="text" className="form-control" placeholder="이름을 입력하세요"
                                    value = {heroName} onChange={nameChange}/>
                                </div>
                            </td>
                        </tr>       
                        <tr>
                            <td>특징</td>
                            <td>
                                <div className="mb-3" style={{marginTop:"13px"}}>
                                    <input type="text" className="form-control" placeholder="특징을 입력하세요"
                                    value = {heroDesc} onChange={descChange}/>
                                </div>
                            </td>
                        </tr>           
                    </tbody>
                </table>
                <div className="container mt-3" style={{textAlign:"right"}}>
                    <Link className="btn btn-dark" onClick = {postData}>등록</Link>&nbsp;&nbsp;
                    <Link className="btn btn-secondary">취소</Link>
                </div>
            </div>
    )
}
export default BoardWrite;