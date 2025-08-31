import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { Navbar, Footer } from "../components";
import { EventsProvider } from "../context";

const MainLayout = () => {
  return (
    <EventsProvider>
      <div>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ToastContainer position="top-center" />
      </div>
    </EventsProvider>
  );
};

export default MainLayout;
