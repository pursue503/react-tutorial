import React, { useEffect } from "react";

const User = ({ user, onRemove, onToggle }) => {

    useEffect(() => { 
        // 컴포넌트에 변화가 일어 날때 사용됨.
    });

    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => onToggle(user.id)}
            >
                {user.username}
            </b>
            &nbsp;
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
}

const UserList = ({ users, onRemove, onToggle }) => {
    return (
        <div>
            {users.map(user => (
                <User
                    user={user}
                    key={user.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    )

    // react 에서는 배열을 랜더링 할 때 key 라는 props 를 설정해야함
    // key 는 각 원소들이 가지고 있는 고유값으로 해야함
    // 만약 고유 값이 없다면 index 를 키로 주자
    // return (
    //     <div>
    //         {users.map((user, index) => (
    //             <User user={user} key={index} />
    //         ))}
    //     </div>
    // )
}


export default React.memo(UserList);