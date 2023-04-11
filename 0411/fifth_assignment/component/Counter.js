import React, {useState} from "react";

function Counter() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [z, setZ] = useState(0);
    
    function xChange(e){
        setX(e.target.value);
    };

    function yChange(e){
        setY(e.target.value);
    };

    const add = () => {
        setZ(parseInt(x)+parseInt(y));
    }

    const sub = () => {
        setZ(parseInt(x)-parseInt(y));
    }

    return(
        <div>
            x : <input type = "text" onChange = {xChange}/><br/>
            y : <input type = "text" onChange = {yChange}/><br/>
            <h1>{z}</h1>
            <button type = "button" onClick = {add}>+</button>
            <button type = "button" onClick = {sub}>-</button>
        </div>
    )
}

export default Counter;