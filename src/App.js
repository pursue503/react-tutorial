// import Hello from './hello';
// import Wrapper from './Wrapper';
// import Counter from './Counter';
// import InputSample from "./InputSample";
import { useCallback, useMemo, useRef, useState } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";


// https://react.vlpt.us/basic/19-React.memo.html 바탕으로 학습

// Chapter 6
// function App() {
//   return (
//     <Wrapper>
//         <Hello name="react" color="red" isSpecial />
//         <Hello color="red" />
//     </Wrapper>
//   )
// }

// Counter useState
// function App() {
//   return (
//     <Counter />
//   );
// }

// input exmaple
// function App() {
//   return (
//     <InputSample />
//   )
// }

// JSON and userList


function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter(user => user.active).length;
}

function App() {

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });

  const { username, email } = inputs;

  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
    },
    [inputs]
  );

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: false,
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false,
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false,
    }
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users => users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(
    id => {
      // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬 ( 불변성을 지키기 위해서 새롭게 만드는것 )
      // 기존에 있는 배열을 수정한다는건 배열이 불변하지 않다는 뜻
      setUsers(users => users.filter(user => user.id !== id));
    },
    []
  );

  const onToggle = useCallback(
    id => {
      setUsers(users =>
        users.map(user =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    },
    []
  );

  // useMemo => 메모리 최적화
  const count = useMemo(() => countActiveUsers(users), [users]); // 첫번 째 파라미터 어떻게 연ㅅ안할지 정의하는 함수 , 두번째 파라미터에는 deps 배열 -> 해당 배열의 내용이 바뀌면 등록한 함수를 호출해서 값을 연산함 -> 바뀌지 않는다면 기존 값을 그대로 ( 캐시느낌 )

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 : {count}</div>
    </>
  )
}

export default App;
