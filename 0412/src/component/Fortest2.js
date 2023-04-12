//For Test 1.js
import React, {useState} from "react";

function Fortest2(props){
    const [fruitList, setFruitList] = useState(["망고", "애플망고", "납작복숭아", "무화과"]);
    const [fruit, setFruit] = useState("");

    const onChange = (e) =>{
        setFruit(e.target.value);
    }

    const goAppend = () =>{
        //배열에 push함수 사용 불가 (push는 원래 배열에 한 요소만 추가하는 형태이므로)
        //요소 추가의 경우, 배열 자체를 새로 만들어 바꿔주어야 함!
        //concat : 새로운 배열을 만들어 "결과배열 = '기존배열(원본)' + '새로운 배열'"

        setFruitList( fruitList.concat(fruit) );
        setFruit(""); //input  태그 공백 채우기
    }

    function goSelect(index){
        alert(fruitList[index]);
    }
    return(
        <div>
            <input type = "text" onChange = {onChange} value = {fruit} />
            <button type = "button" onClick = {goAppend}>Add</button>
            <br/>
            <ul>
            {fruitList.map( (element, index)=>{
                return(
                    <li key = {index}>
                        <a href = '#none' onClick = {()=>{goSelect(index)}}>{element}</a>
                    </li>
                )
            })
        }
            </ul>
        </div>
    )
}

export default Fortest2;


