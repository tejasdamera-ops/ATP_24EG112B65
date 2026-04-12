import { useState, useEffect } from "react";
import { useNavigate } from "react-router";


function ListOfEmp() {
  const [emps, setEmps] = useState([]);
  const navigate = useNavigate();

  const gotoEmploee = (empObj) => {
    (navigate("/employee"), { state: empObj });
  };

  const gotoEditEmploee = () => {
    navigate("/edit-emp");
  };

  useEffect(() => {
    async function getEmps() {
      let res = await fetch("http://localhost:4000/emp-api/employees");
      if (res.status === 200) {
        let resObj = await res.json();
        setEmps(resObj.payload);
      }
    }
    getEmps();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center">List of Employees</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {emps.map((empObj) => (
          <div key={empObj._id} className=" bg-white p-5">
            <p>{empObj.email}</p>
            <p>{empObj.name}</p>
            <div className="flex justify-around">
              <button
                className="bg-green-400 rounded-2xl"
                onClick={() => {
                  gotoEmploee(empObj);
                }}
              >
                View
              </button>
              <button
                className="bg-yellow-400 rounded-2xl"
                onClick={() => {
                  gotoEditEmploee(empObj);
                }}
              >
                Edit
              </button>
              <button className="bg-red-400 rounded-2xl">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListOfEmp;
