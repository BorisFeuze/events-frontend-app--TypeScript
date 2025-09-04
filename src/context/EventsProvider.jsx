import { useState, useEffect } from "react";
import { EventContext } from ".";
import { getEvents } from "../data";

const EventsProvider = ({ children }) => {
  // Store events in state
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        // Fetch all events from API
        const eventData = await getEvents(abortController);
        setEvents(eventData.results); // Save events in state
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("Fetch Aborted");
        } else {
          console.error(error);
        }
      }
    })();

    // Cleanup: abort API request when component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  // Provide events state to children via context
  return <EventContext value={{ events, setEvents }}>{children}</EventContext>;
};

export default EventsProvider;
