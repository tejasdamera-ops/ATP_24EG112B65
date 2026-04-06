import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Counter from "./components/Counter";
import UsersList from "./components/UserList";
import { useState } from "react";
import TestRefTypes from "./components/TestRefTypes";
import APIDemo from "./components/APIDemo";
import FormDemo from "./components/FormDemo";
import CreateUsers from "./components/CreateUsers";

function App() {
  //state

  console.log("App rendered");

  //return react element
  return (
    <div>
      <Navbar />
      <div className="m-16 min-h-screen">
      <APIDemo />
      </div>
      <Footer />
    </div>
  );
}

export default App;