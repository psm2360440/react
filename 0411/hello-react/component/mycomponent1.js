//rcc  클래스 기반 컴포넌트를 만들어 준다.

import React, { Component } from 'react';

//첫글자 대문자
class Mycomponent1 extends Component {
    render() {
        return (
            <div>
                <h1>클래스기반 컴포넌트</h1>
            </div>
        );
    }
}

export default Mycomponent1;