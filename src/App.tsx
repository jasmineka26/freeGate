import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Users from "./components/Users";

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
                  <Dashboard />
                  <Users />
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
