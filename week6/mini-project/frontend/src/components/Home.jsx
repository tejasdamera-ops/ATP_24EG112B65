import React from "react";
import { useContext } from "react";
import { couterContextObj } from "../context/ContextProvider";
import { useCounterStore } from "../store/CounterStore.js";
function Home() {
  // const { count, changeCounter } = useContext(couterContextObj);
  // let data=useCounterStore();
  // console.log(data);
  console.log('home');
  

// const {newCounter,incrementCounter}=useCounterStore()
//this will return the all the state and functions from the store
//so it will always re-render the component when any state changes in the store


//but if we want to re-render the component only when the specific state changes then we can use the selector function
const newCounter=useCounterStore(state=>state.newCounter)
const incrementCounter=useCounterStore(state=>state.incrementCounter)

  
  return (
    <div>
      <h1>counter:{count}</h1>
      <button onclick={changeCounter}>change</button>
    </div>
  );
}

export default Home;
