import React, { Component } from 'react';

class Appclass extends Component {
    //생성자 : props와 state를 사용할 때는 반드시 생성자를 써야 한다.
    //props : 부모컴포넌트로부터 자식컴포넌트로 값을 보내기 위한 수단
            //반대방향(자식=>부모)은 불가능
            //단방향 컴포넌트
     constructor(props){
        super(props); //부모 생성자를 호출한다. 이 코드는 반드시 생성자의 첫번째 위치에 있어야 한다.
                      //앞에 다른 코드가 먼저 올 수 없다.
        this.state = { name: "박선미", age: 23,  phone:"010-4301-0417", wow: "나컴포넌트여"};
        //state 객체가 각 컴포넌트마다 반드시 있다. 이 객체에  json 형태의 객체를 저장할 수 있다.
        //개별 변수는 태그에서 사용할 수 없다.
     }
    render() {
        const {name, age, phone, wow} = this.state; //this.stae에 json객체 저장 
        //(이전에는 json 객체의 필드명과 값을 각각 끌고 와야 했다. 제이슨 형태 그대로 할당? 불러올 수 없었다. 위와 같은 방법을 해체라 한다.)
        const{title, address} = this.props; //destruction (json)해체 기능
        return (
            <div>
                <table>
                    <tr>
                        <td>제목</td>
                        <td>{title}</td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td>나이</td>
                        <td>{age}</td>
                    </tr>
                    <tr>
                        <td>연락처</td>
                        <td>{phone}</td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td>{address}</td>
                    </tr>
                </table>

                <button type = "button" onClick = {()=>{ alert(" W O W ");}}>{wow}</button>
            </div>
        );
    }
}


export default Appclass;