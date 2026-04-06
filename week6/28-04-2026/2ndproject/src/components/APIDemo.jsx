import { useState, useEffect } from "react";

function APIDemo() {
  console.log("API demo rendered");
  let [users, setUsers] = useState([]);
  //  users → stores data from API (initially empty array [])
  // setUsers → function to update users
  let [loading, setLoading] = useState(false);
  // loading → boolean to track if API call is in progress (initially false)
  // setLoading → function to update loading state
  let [error, setError] = useState(null);
  //   error → stores error if API fails
  // Starts as null (no error)

  useEffect(() => {
    //a function to make API req
    async function getData() {
      //set loading to true
      setLoading(true);

      try {
        let res = await fetch("https://jsonplaceholder.typicode.com/comments");
        let usersList = await res.json();
        //update state
        setUsers(usersList);
      } catch (err) {
        console.log("err is ", err);
        //update error state
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    //call
    getData();
  }, []);

  //deal with loading state
  if (loading === true) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-center text-2xl font-semibold text-gray-700 animate-pulse">
          Loading....
        </p>
      </div>
    );
  }
  //deal with error state
  if (error !== null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-center text-red-500 text-xl font-bold">
          {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          List of Users
        </h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((userObj) => (
            <div
              key={userObj.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {userObj.name}
              </h2>
              <p className="text-sm text-gray-600">{userObj.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default APIDemo;
