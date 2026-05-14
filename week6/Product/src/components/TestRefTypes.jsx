import { useState } from "react";

function TestRefTypes() {
  //state
  const [user, setUser] = useState({ username: "ravi", age: 21, city: "hyd" });
  const [marks, setMarks] = useState([10, 20, 30]);

  //update user state
  const updateUser = () => {
    setUser({ ...user, username: "bhanu", age: 23 });
    //{username: "ravi", age: 21, city: "hyd",username:"bhanu"}
  };

  //update marks
  const updateMarks = () => {
    setMarks([40, ...marks]);
  };

  return (
    <div className="text-center mt-9">
      <p className="text-3xl">Username : {user.username}</p>
      <p className="text-3xl">Age : {user.age}</p>
      <p className="text-3xl">City : {user.city}</p>
      <button onClick={updateUser} className="p-5 bg-amber-500">
        UpdateUser
      </button>

      {marks.map((mark) => (
        <p className="text-3xl" key={mark}>
          {mark}
        </p>
      ))}
      <button onClick={updateMarks} className="p-5 bg-amber-500">
        Update Marks
      </button>
    </div>
  );
}

export default TestRefTypes;

// 5===5 ---> true
//{ a:10} === {a:10}-->false
//[1,2,3]===[1,2,3] -->false
// [10,20,30]--push(40)->[10,20,30,40]

//react only rerenders when state is updated with new reference value
//react will not rerender if we update state with same reference value
