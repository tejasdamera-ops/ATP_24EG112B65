import React from "react";
import { useCounterStore } from "../store/CounterStore.js";

function Home() {
  const newCounter = useCounterStore((state) => state.newCounter);
  const incrementCounter = useCounterStore((state) => state.incrementCounter);

  return (
    <div>
      <h1>counter: {newCounter}</h1>
      <button onClick={incrementCounter}>change</button>
    </div>
  );
}

export default Home;
