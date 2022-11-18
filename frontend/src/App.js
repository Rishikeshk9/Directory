import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddType from "./components/AddType/AddType";
import AddDept from "./components/AddDept/AddDept";

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/create/dept" element={<AddDept />}></Route>
        <Route path="/create/type" element={<AddType />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
