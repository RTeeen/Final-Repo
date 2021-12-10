import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import Nav from "./pages/Nav";
import AddNew from "./pages/AddNew";
import Edit from "./pages/Edit";
import List from "./pages/List";

function App() {
  return (
    <div className='App'>
      <Nav />
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/addnew' element={<AddNew />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
