import React, {Component} from "react";

class HelloComponent extends Component{
    sayHello(){
        alert("W O W");
    }

    render(){
        return(
            <div>
                <h1>함수호출하기</h1>
                <button type = "button" onClick = {this.sayHello}>CALL</button>
            </div>
        )
    }
}

export default HelloComponent;