import React from 'react';

// jsx 
function hello({color, name, isSpecial}) {
    return (
    <div style={{ color }}>
        { isSpecial && <b>*</b>}
        안녕하세요 {name}
    </div>
    )
}

// default Props 
hello.defaultProps = {
    name: '이름없음'
}

export default hello;