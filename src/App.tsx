import { useState, useEffect, useCallback, MouseEvent, KeyboardEvent, useMemo, useRef } from "react"

interface User {
  id: number,
  username: string
};

type fibFunc = (n: number) => number;

const fib: fibFunc = (n) => {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
};

const myNum: number = 25;

function App() {


  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  console.log(inputRef?.current);
  console.log(inputRef?.current?.value);

  // useEffect handles side effects. 
  // Here, because we supply users to the dependency array, useEffect will run whenever
  // the state of users changes. In strict mode (dev mode): mounts, unmounts, then mounts again
  useEffect(() => {
      console.log('mounting');
      console.log('Users: ', users);

      return () => console.log('unmounting');
  }, [users])

  // useCallback returns memoized result of callback that only changes if its input has changed
  const addTwo = useCallback(
    (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>): void => setCount(prev => prev + 2),
    []
  );

  // useMemo only recalculates the result if a dependency in the dependency array has changed
  const result = useMemo(() => fib(myNum), [myNum]);
  
  return (
    <>
      <div className="App">
        <h1>{count}</h1>
        <button onClick={addTwo}>Add</button>
        <h2>{result}</h2>
        <input ref={inputRef} type="text" />
      </div>
    </>
  );
};

export default App;
