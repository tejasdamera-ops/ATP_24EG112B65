import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../config/apiConfig";

function ListOfEmp() {
  const [emps, setEmps] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const gotoEmploee = (empObj) => {
    navigate("/employee", { state: empObj });
  };

  const gotoEditEmploee = (empObj) => {
    navigate("/edit-emp", { state: empObj });
  };

  const deleteEmployee = async (id) => {
    try {
      const res = await fetch(`${API_ENDPOINTS.EMPLOYEES}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete employee: ${res.status}`);
      }

      setEmps((prevEmps) => prevEmps.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
      setError(err.message || "Unable to delete employee.");
    }
  };

  useEffect(() => {
    async function getEmps() {
      try {
        const res = await fetch(API_ENDPOINTS.EMPLOYEES);
        if (!res.ok)
          throw new Error(`Failed to fetch employees: ${res.status}`);
        const resObj = await res.json();
        setEmps(resObj.payload || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError(err.message || "Unable to fetch employees.");
      }
    }
    getEmps();
  }, []);

  if (error) {
    return <p className="text-center text-red-500 text-xl mt-10">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-4xl text-center">List of Employees</h1>
      {emps.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No employees found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {emps.map((empObj) => (
            <div key={empObj._id} className=" bg-white p-5">
              <p>{empObj.email}</p>
              <p>{empObj.name}</p>
              <div className="flex justify-around">
                <button
                  className="bg-green-400 rounded-2xl"
                  onClick={() => gotoEmploee(empObj)}
                >
                  View
                </button>
                <button
                  className="bg-yellow-400 rounded-2xl"
                  onClick={() => gotoEditEmploee(empObj)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-400 rounded-2xl"
                  onClick={() => deleteEmployee(empObj._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListOfEmp;
