//Iftest1.js
import React, {useState} from "react";

function Iftest1(props){
    const [flag, setFlag] = useState(true);
    const changeFlag = () => {
        setFlag ( !flag ); //flag = true -> flag (true->false)
    }
    return (
        <div>
            <h1>if테스트 {flag}</h1>
            <button type = "button" onClick = {changeFlag}>커몬</button>
            <p>{flag?'이 문구가 보입니다.':''}</p>
        </div>
    )
}

export default Iftest1;