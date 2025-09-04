import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { Navbar, Footer } from "../components";
import { EventsProvider, AuthProvider } from "../context";

const MainLayout = () => {
  return (
    <AuthProvider>
      <div className="bg-slate-200 text-gray-100 flex flex-col min-h-screen">
        <Navbar />
        <EventsProvider>
          <main className="flex-grow flex flex-col pt-[4.1rem]">
            <Outlet />
          </main>
        </EventsProvider>
        <Footer />
        <ToastContainer position="top-center" />
      </div>
    </AuthProvider>
  );
};

export default MainLayout;
