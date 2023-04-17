import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { SERVERIP  } from '../../CommonUtil';
import {Link, useNavigate, useParams} from 'react-router-dom';

//변수 4개를 하나의 JSON객체로 저장 : 필드가 많을 때 하나씩 만들면 정신 복잡.

 
function BoardWrite(props){
    const {id} = useParams(); //보내는 쪽에서 json 객체로 보냄
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        tilte: '', writer: '', contents: '', filename: ''
    });

    const onChange = (e) => {
        const {value, name} = e.target; //입력 객체로부터 값과 이름을 가져온다.
        console.log( value, name);
        setInputs({...inputs, [name]:value}) //{...inputs} : json객체 복사 (문법) 
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    // 서버로 전송하기
    const postData=()=>{
        // 데이터를 json 으로 묶어서 보내야한다
        let frmData = new FormData();
        frmData.append("title", inputs.title);
        frmData.append("writer", inputs.writer);
        frmData.append("contents", inputs.contents);
        frmData.append("file", window.document.myform.file.files[0]);
        // 파일 첨부 시 자바스크립트가 파일이 여러개 첨부하도록 처리한다.
        // 그래서 무조건 배열의 형태이다. document.폼이름.file 태그의 name속성.files[0];
        // 여러개 추가할 수도 있다

        axios.post(SERVERIP+"/rest_board/save", frmData)
        .then( (res)=>{
            console.log(res.data);
            history("/board/list"); //redirect에 대응
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const {title, writer, contents, file} = inputs;


    return(
            <div className='container mt-3'>
                <form name = "myform" encType = "multipart/form-data">
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
                                        <input type="text" className="form-control" 
                                        placeholder="이름을 입력하세요"
                                        name = "title"
                                        value = {title}
                                        onChange={onChange}/>
                                    </div>
                                </td>
                            </tr>       
                            <tr>
                                <td>내용</td>
                                <td>
                                    <div className="mb-3" style={{marginTop:"13px"}}>
                                        <input type="text" className="form-control"
                                        placeholder="특징을 입력하세요"
                                        name = "contents" 
                                        value = {contents} 
                                        onChange={onChange}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>작성자</td>
                                <td>
                                    <div className="mb-3" style={{marginTop:"13px"}}>
                                        <input type="text" className="form-control" 
                                        placeholder="ID를 입력하세요"
                                        name = "writer" 
                                        value = {writer} 
                                        onChange={onChange}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>파일</td>
                                <td>
                                    <div className="mb-3" style={{marginTop:"13px"}}>
                                        <input type="file" className="form-control" 
                                        placeholder="파일을 첨부하세요"
                                        name = "file" 
                                        value = {file} 
                                        onChange={onChange}/>
                                    </div>
                                </td>
                            </tr>                  
                        </tbody>
                    </table>
                    <div className="container mt-3" style={{textAlign:"right"}}>
                        <Link className="btn btn-dark" onClick = {postData}>등록</Link>&nbsp;&nbsp;
                        <Link className="btn btn-secondary">취소</Link>
                    </div>
                    </form>
                </div>
    )
}
export default BoardWrite;