//For Test 1.js
import React, {useState} from "react";

function Fortest1(props){
    const [fruitList] = useState(["망고", "애플망고", "납작복숭아", "무화과"]);

    function goSelect(index){
        alert(fruitList[index]);
    }
    return(
        <div>
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

export default Fortest1;


