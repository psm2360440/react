import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { SERVERIP  } from '../../CommonUtil';
import {Link} from 'react-router-dom';

function BoardList(props){
    const [boardList, setBoardList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect( ()=>{
        async function loadData(){
        const url = SERVERIP+"/hero/list";
        await axios.get(url)
        .then((res)=>{
            setBoardList(res.data);
            setLoading(true);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    loadData();
        console.log(boardList);
    }, [])

    return(
        <div  className="container">
            <h1>BoardList</h1>
            <div className="input-group mb-3" style = {{marginTop: "80px"}}>
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                선택하세요
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">제목</a></li>
              <li><a className="dropdown-item" href="#">내용</a></li>
              <li><a className="dropdown-item" href="#">제목+내용</a></li>
            </ul>
            <input type="text" className="form-control" placeholder="Search"/>
            <button className="btn btn-secondary" type="submit">Go</button>
          </div>

        <table className="table table-hover ">
            <colgroup>
                <col style={{width: "10%"}}></col>
                <col style={{width: "45%"}}></col>
                <col style={{width: "45%"}}></col>
            </colgroup>
            <thead className="table-secondary">
              <tr>
                <th>id</th>
                <th>NAME</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
                {
                    loading ===true?
                    boardList.map( (item, index)=>{
                        return(
                            <tr key ={index}>
                                <td>{item.id}</td>
                                <td><Link to={'/board/view/'+item.id}>{item.hero_name}</Link></td>
                                <td>{item.hero_desc}</td>
                            </tr>

                        )
                    })
                    :""
                }
            </tbody>
          </table>

          <Link  className="btn btn-secondary" to="/board/write">WRITE</Link>
        </div>
    )
}
export default BoardList;