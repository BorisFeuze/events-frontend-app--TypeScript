import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "../Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default MainLayout;
