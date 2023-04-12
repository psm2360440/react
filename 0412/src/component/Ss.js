import React, {useState} from "react";

function Ss(props){
    const [dan, setDan] = useState(4); 
    const [iList] = useState([1,2,3,4,5,6,7,8,9]);
    const [show, setShow] = useState(false);

    const danChange = (e) =>{
        setShow(false); //show를 false로 해서 화면에 출력을 막음
        setDan(e.target.value); //단 값 넣고
    }

    const goConfirm =()=>{
        setShow(true);
    }   


    return(
        <div>
            단 : <input type = "text" onChange = {danChange}></input><br/>
            <button type = "button" onClick = { goConfirm }>Go</button>
            <br/><br/>
            <ul>
            {
                show?
                iList.map( (element, index)=>{
                    return(
                        <li key = {index}>
                            {dan} X {element}= {dan * element}
                        </li>
                    );
                })
                :""
            }
            </ul>
        </div>
    )
}

export default Ss;