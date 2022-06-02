import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

import Home from "./components/Home";
import Select from "./components/SelectPayment";

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
