import React, { useRef, useState } from "react";


function InputSample() {

    // 객체 형태의 상태 관리
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });
    const nameInput = useRef(); // getElementById 와 같은 역할 , 특정 DOM에 접근 할 때 주로 사용함.

    const {name, nickname} = inputs; // 비구조화로 값 추출

    
    const onChange = (e) => {
        console.log(e.target);
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출

        console.log("value : {}", value);
        console.log("name : {}", name);
        
        setInputs({
            ...inputs, // 기존 input 객체를 복사
            [name]: value // name 키를 가진 값을 value 로 설정
        })
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        })
        nameInput.current.focus();
    }

    return (
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;