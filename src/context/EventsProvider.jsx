import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { EventContext } from ".";
import { getEvents } from "../data";

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const eventData = await getEvents(abortController);
        setEvents(eventData.results);
      } catch (error) {
        if (error.name === "AbortError") {
          toast.info("Fetch Aborted");
        } else {
          toast.error(error.message || "Something went wrong");
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);
  return <EventContext value={{ events, setEvents }}>{children}</EventContext>;
};

export default EventsProvider;
