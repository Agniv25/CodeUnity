import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import HomePage from "./pages/HomePage";
import Projects from "./pages/Projects";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route
              path="/home/:username/:projectType/:projectName"
              element={<HomePage />}
            ></Route>
            <Route path="/home/:username" element={<Projects />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
