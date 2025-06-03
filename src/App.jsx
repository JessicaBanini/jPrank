import React, { useState } from "react";
import './App.css'
import Prank from "./Prank"; // Import the Prank component

function App() {
  const [isPrankActive, setIsPrankActive] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Prank />
    </div>
  );
}

export default App;