import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { SERVERIP  } from '../../CommonUtil';
import {Link, useNavigate, useParams} from 'react-router-dom';

function Score(props){
    const [Score, setScore] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect( ()=>{
        async function loadData(){
        const url = SERVERIP+"/hero/score";
        await axios.get(url)
        .then((res)=>{
            setScore(res.data);
            setLoading(true);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    loadData();
        console.log(Score);
    }, [])

    return(
        <div className = "container">
            <h1>성적확인</h1>

            <table className="table table-hover ">
            <colgroup>
                <col style={{width: "10%"}}></col>
                <col style={{width: "30%"}}></col>
                <col style={{width: "30%"}}></col>
                <col style={{width: "30%"}}></col>
            </colgroup>
            <thead className="table-secondary">
              <tr>
                <th>이름</th>
                <th>국어</th>
                <th>수학</th>
                <th>영어</th>
              </tr>
            </thead>
            <tbody>
            {
                    loading ===true?
                    Score.map( (item, index)=>{
                        return(
                            <tr key ={index}>
                                <td>{item.s_name}</td>
                                <td>{item.kor}</td>
                                <td>{item.mat}</td>
                                <td>{item.eng}</td>
                            </tr>
                        )
                    })
                    :""
                }
            </tbody>
          </table>
        </div>
    )
}
export default Score;