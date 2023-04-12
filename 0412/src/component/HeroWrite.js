import { useState } from "react";
import axios from 'axios'

function HeroWrite(prop){
    const [hero_name, setHeroName] =useState("");
    //useState 함수가 문자열변수와 변수값 바꾸는 함수를 만들어 배열형태로 전달한다.
    const [hero_desc, setHeroDesc] =useState("");
    
    //input태그의 값이 바뀌면 이 함수가 호출된다
    const heroNameChange = (e) =>{
        setHeroName(e.target.value);
    }
    const heroDescChange = (e) =>{
        setHeroDesc(e.target.value);
    }

    //form태그를 써서 서버로 전송할 때 <button>태그에 type="button" 속성이 없으면 버튼을 누를 때 submit() 함수가 호출된다.
    //submit 함수가 호출되면 form태그에 onSubmit이벤트핸들러가 호출된다.
    //이때 잡아채서 서버에 전송하는 처리를 한다. onSubmit함수의 경우 무조건 서버로 전송한다.
    //이를 막기 위하여  preventDefault()함수를 호출한다.
    const onSubmit = (e) =>{
        e.preventDefault(); //form태그를 통하여 서버에 정보를 전송할 때, 전송 전에 호출된다.
                            //버튼의 기본 기능을 정시시킨다.  submit버튼의 submit 기능을 막고, 별도의 처리를 한다.
        axios.post("http://localhost:9090/hero/write",
        {hero_name:hero_name, hero_desc:hero_desc})
        .then( (res)=>{
            console.log(res.data.result);
            alert("조직도 저장 완료!");
            window.location.reload();
            //화면다시불러오기
            //location객체는 원래 존재하는데 부모가 윈도우인 객체
            //react가 아니면  location.,reload()만 호출해도 되는데 
            //react는 window.location.reload()로 호출해야 한다.
        })
        .catch( (res, status, error)=>{
            console.log(res);
        })
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <h3>조직도</h3>
                이름 : <input type = "text" onChange={heroNameChange}></input><br/>
                업적 : <input type = "text"onChange={heroDescChange}></input><br/>

                <button>Add</button>
            </form>
        </div>
    )
} 
export default HeroWrite;