import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AsideMenue from "./components/AsideMenue";
import CardsPage from "./components/CardsPage";
import Config from "./components/ConfigPage";
import Dashboard from "./components/Dashboard";
import Login from "./components/LoginPage";
import UsersPage from "./components/UsersPage";
import PackesPages from "./components/Packes";
import ServerPages from "./components/ServerPages";
import PaymentsPage from "./components/PaymentsPage";
import PaymentReportPage from "./components/PaymentReportPage";
import CategoriesPage from "./components/CategoriesPage";

function App() {
  return (
    <>
      <div dir="rtl" className="font-sans bg-gray-200">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/users"
              element={
                <div className="flex flex-row w-screen gap-5 ">
                  <AsideMenue />
                  <UsersPage />
                </div>
              }
            />
            <Route
              path="/dashboard"
              element={
                <div className="flex flex-row w-screen gap-5 ">
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
                  <CardsPage />
                </div>
              }
            />
            <Route
              path="/configs"
              element={
                <div className="flex flex-row w-screen gap-5">
                  <AsideMenue />
                  <Config />
                </div>
              }
            />
            <Route
              path="/packages"
              element={
                <div className="flex flex-row w-screen gap-5">
                  <AsideMenue />
                  <PackesPages />
                </div>
              }
            />
            <Route
              path="/servers"
              element={
                <div className="flex flex-row w-screen gap-5">
                  <AsideMenue />
                  <ServerPages />
                </div>
              }
            />
            <Route
              path="/payments"
              element={
                <div className="flex flex-row w-screen gap-5">
                  <AsideMenue />
                  <PaymentsPage />
                </div>
              }
            />
            <Route
              path="/report"
              element={
                <div className="flex flex-row w-screen gap-5">
                  <AsideMenue />
                  <PaymentReportPage />
                </div>
              }
            />
            <Route
              path="/categories"
              element={
                <div className="flex flex-row w-screen gap-5">
                  <AsideMenue />
                  <CategoriesPage />
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
