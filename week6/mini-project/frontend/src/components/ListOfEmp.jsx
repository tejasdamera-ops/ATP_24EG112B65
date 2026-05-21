import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EMP_API_URL } from "../config/apiConfig.js";

function ListOfEmps() {
  const [emps, setEmps] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const goToEmployee = (empObj) => {
    // navigate to employee programatically along iwth the empobj
    navigate("/employee", { state: empObj });
  };
  const deleteEmp = async (id) => {
    try {
      setLoading(true);
      setError("");
      let res = await axios.delete(`${EMP_API_URL}/${id}`);
      if (res.status === 200) {
        //get the latest data
        getEmps();
      }
    } catch (err) {
      console.log("err in catch", err);
      //deal with err
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goToEditEmp = (empObj) => {
    navigate("/edit-emp", { state: empObj });
  };
  async function getEmps(empObj) {
    try {
      setLoading(true);
      setError("");
      let res = await axios.get(EMP_API_URL);
      if (res.status === 200) {
        let resObj = res.data;
        setEmps(resObj.payload);
      }
    } catch (err) {
      console.log("err in catch", err);
      //deal with err
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getEmps();
  }, []);
  if (loading) {
    return <p className="text-center text-4xl">Loading....</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center text-3xl">{error}</p>;
  }
  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200/80 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Team roster
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Employee directory
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Browse staff records and use the quick actions to manage each
            profile.
          </p>
        </div>
        <button
          onClick={() => navigate("create-emp")}
          className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Add new employee
        </button>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {emps.map((empObj) => (
          <article
            key={empObj._id}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                {empObj?.designation || "Team member"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {empObj?.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {empObj?.companyName}
              </p>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Email:</span>{" "}
                {empObj?.email}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Phone:</span>{" "}
                {empObj?.mobile}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => goToEmployee(empObj)}
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                View
              </button>
              <button
                onClick={() => goToEditEmp(empObj)}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Edit
              </button>
              <button
                onClick={() => deleteEmp(empObj._id)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ListOfEmps;
