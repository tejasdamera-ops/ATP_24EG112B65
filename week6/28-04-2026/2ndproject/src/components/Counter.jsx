import { useState } from "react";

function Counter() {
  //state
  const [count, setCount] = useState(0); //[ state,funciton to modify state]

  //Event handler functions to modify the state
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  const reset=(value)=>{
    setCount(value)
  }

  console.log("Counter component");
  return (
    <div className="text-center p-10 border">
      <h1 className="text-6xl">Count :{count}</h1>
      <button className="bg-green-400 px-6 py-3 mr-10" onClick={increment}>
        +
      </button>
      <button className="bg-red-400 px-6 py-3" onClick={decrement}>
        -
      </button>

      <button className="bg-orange-400 px-6 py-3" onClick={()=>reset(0)}>
        reset
      </button>
    </div>
  );
}

export default Counter;