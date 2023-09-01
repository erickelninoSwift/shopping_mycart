import { useState } from "react";
import "./index.css";
import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import { useAppContextApplication } from "./Context";
function App() {
  const { loading } = useAppContextApplication();

  if (loading) {
    return (
      <main>
        <div className="loading" style={{ marginTop: "6rem" }}></div>
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
