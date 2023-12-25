import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./components/Login";
import UserTable from "./components/UsersTable";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <div dir="rtl">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/users"
              element={
                <div className="flex flex-row w-screen gap-5">
                  <Dashboard />
                  <UserTable />
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
