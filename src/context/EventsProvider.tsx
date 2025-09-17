import { useState, useEffect, type ReactNode } from "react";
import { toast } from "react-toastify";
import { EventContext } from ".";
import { getEvents } from "../data";
import type { Event } from "../types";

const EventsProvider = ({ children }: { children: ReactNode }) => {
  // Store events in state
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        // Fetch all events from API
        const eventData = await getEvents(abortController);
        setEvents(eventData.results); // Save events in state
      } catch (error) {
        if (error.name === "AbortError") {
          toast.info("Fetch Aborted");
        } else {
          toast.error(error.message || "Something went wrong");
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
