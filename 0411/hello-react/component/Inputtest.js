import React, {useState} from "react";

//props 사용여부와 관계 없이 기본매개변수로 사용하자
function Inputtest(props){
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    
    //람다함로 줘야 함.(일반함수의 경우 생성자에서 바인딩 작업을 해야 한다.)
    const nameChange = (e) => {
        //인자가 발생한 이벤트에 대한 모든 정보
        //키를 누른 값이 저장되어 있다.
        setName( e.target.value ); //name변수의 값이 바뀐다.
    }
    const ageChange = (s) => {
        setAge( s.target.value );
    }
    const emailChange = (m) => {
        setEmail( m.target.value );
    }

    let myStyle = {
        color: "lightpink",
        backgroundColor: "lightskyblue",
        fontSize: "20px",
        padding: "10px 10px 10px 20px"

    }
    return (

        <div>
            이름 : <input type = "text" onChange = {nameChange} style = {{color:"moccasin", backgroundColor:"navy"}}/><br/>
            나이 : <input type = "text" onChange = {ageChange} style = {myStyle}/><br/>
            이메일 : <input type = "text" onChange = {emailChange} style = {{color:"lightsalmon", backgroundColor:"lightseagreen"}}/><br/>
            <p>{name} {age} {email}</p>
        </div>

    )


}

export default Inputtest;