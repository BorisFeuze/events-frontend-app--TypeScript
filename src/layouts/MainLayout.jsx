import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { Navbar, Footer } from "../components";
import { EventsProvider } from "../context";
import { getEvents } from "../data/events";

const MainLayout = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const eventData = await getEvents(abortController);
        console.log(eventData);
        setEvents(eventData);
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("Fetch Aborted");
        } else {
          console.error(error);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div>
      <Navbar />
      <main>
        <Outlet context={{ events, setEvents }} />
      </main>
      <Footer />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default MainLayout;
