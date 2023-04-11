import React, {useState} from "react";

function Score() {
    const [name, setName] = useState("");
    const [kor, setKor] = useState(0);
    const [eng, setEng] = useState(0);
    const [mat, setMat] = useState(0);
    const [score, setScore] = useState("");

    function getName(e){
        setName(e.target.value);
    }
    
    function getKor(e){
        setKor(e.target.value);
    };

    function getEng(e){
        setEng(e.target.value);
    };

    function getMat(e){
        setMat(e.target.value);
    };

    function getScore(e){
        setScore(name + '님의 총점은 ' + (parseInt(kor)+parseInt(eng)+parseInt(mat)) + '점이고 평균은 ' + (parseInt(kor)+parseInt(eng)+parseInt(mat))/3 +'점 입니다!');
    }

    return(
        <div>
            이름 : <input type = "text" onChange = {getName}/><br/>
            국어 : <input type = "text" onChange = {getKor}/><br/>
            영어 : <input type = "text" onChange = {getEng}/><br/>
            수학 : <input type = "text" onChange = {getMat}/><br/>
            <button type = "button" onClick = {getScore}>결과확인</button>
            <h3>{score}</h3>
        </div>
    )
}

export default Score;