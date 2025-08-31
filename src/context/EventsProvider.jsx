import { useState, useEffect } from "react";
import { EventContext } from "./index.js";
import { getEvents } from "../data/index.js";

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  console.log(events);
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
  return <EventContext value={{ events, setEvents }}>{children}</EventContext>;
};

export default EventsProvider;
