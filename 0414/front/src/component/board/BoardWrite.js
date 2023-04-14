import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { SERVERIP  } from '../../CommonUtil';
import {Link, useNavigate, useParams} from 'react-router-dom';


function BoardWrite(props){
    const {id} = useParams(); //보내는 쪽에서 json 객체로 보냄
    const history = useNavigate();
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [writer, setWriter] = useState("");
    const[cmt, setCmt] = useState("")
    const[comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect (() =>{
        console.log("id : " + id);
        /*
        window.onload()의 역할을 하는 곳이 여기
        */
       
        async function loadData(id){
            let results = await axios.get(SERVERIP+"/rest_board/view/"+id);

            console.log( results.data.boardData.title);
            console.log( results.data.boardData.contents);
            console.log( results.data.boardData.writer);
   

            setComments(results.data.comments);
            setTitle(results.data.boardData.title);
            setContents(results.data.boardData.contents);
            setWriter(results.data.boardData.writer);
            setCmt(results.data.boardData.cmt);
            setLoading(true);

            console.log(comments);

    }
    if ( id != undefined){
        loadData(id);
    }





    },[])
    const titleChange = (e)=>{
        setTitle((e.target.value));
    } 
    
    const contentsChange = (e)=>{
        setContents((e.target.value));
    }

    const writerChange = (e)=>{
        setWriter((e.target.value));
    }

    const postData = ()=>{
        //데이터를 json으로 묶어서 보내야 한다.
        const data = {title:title, contents:contents, writer:writer};
        axios.post(SERVERIP+"/rest_board/write", data)
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
            <div className='container mt-3'>
                <h1>WRITE</h1>
                <table className="table table-hover " style={{marginTop: "30px"}}>
                    <colgroup>
                        <col style = {{width: "25%"}}/>
                        <col style = {{width:"*"}}/>
                    </colgroup>       
                    <tbody>
                        <tr>
                            <td>제목</td>
                            <td>
                                <div className="mb-3" style={{marginTop:"13px"}}>
                                    <input type="text" className="form-control" placeholder="이름을 입력하세요"
                                    value = {title} onChange={titleChange}/>
                                </div>
                            </td>
                        </tr>       
                        <tr>
                            <td>내용</td>
                            <td>
                                <div className="mb-3" style={{marginTop:"13px"}}>
                                    <input type="text" className="form-control" placeholder="특징을 입력하세요"
                                    value = {contents} onChange={contentsChange}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>작성자</td>
                            <td>
                                <div className="mb-3" style={{marginTop:"13px"}}>
                                    <input type="text" className="form-control" placeholder="특징을 입력하세요"
                                    value = {writer} onChange={writerChange}/>
                                </div>
                            </td>
                        </tr>              
                    </tbody>
                </table>
                <div className="container mt-3" style={{textAlign:"right"}}>
                    <Link className="btn btn-dark" onClick = {postData}>등록</Link>&nbsp;&nbsp;
                    <Link className="btn btn-secondary">취소</Link>
                </div>
                <label for="comments"><b>Comments:{cmt}</b></label>
                <table className="table table-hover ">
                    <tbody>
                        {
                            loading ===true?
                            comments.map( (item, index)=>{
                                return(
                                    <tr key ={index}>
                                        <td style={{textAlign: "start"}}><b>{item.comWriter} </b>({item.comDate})<br/>
                                        {item.comContents}
                                        </td>
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
export default BoardWrite;