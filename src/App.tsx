import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AsideMenue from "./components/AsideMenue";
import Login from "./components/Login";
import Users from "./components/Users";
import Dashboard from "./components/Dashboard";
import Cards from "./components/Cards";

function App() {
  return (
    <>
      <div dir="rtl" className="font-sans">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/users"
              element={
                <div className="flex flex-row w-screen gap-5">
                  <AsideMenue />
                  <Users />
                </div>
              }
            />
            <Route
              path="/dashboard"
              element={
                <div className="flex flex-row w-screen gap-5">
                  <AsideMenue />
                  <Dashboard />
                </div>
              }
            />
            <Route
              path="/cards"
              element={
                <div className="flex flex-row w-screen gap-5">
                  <AsideMenue />
                  <Cards />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
      />
    </>
  );
}

export default App;
