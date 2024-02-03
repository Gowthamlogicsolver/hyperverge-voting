import { useState } from "react";
import Voting from "./Voting";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Voting />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
