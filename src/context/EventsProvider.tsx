import { useState, useEffect, type ReactNode } from "react";
import { toast } from "react-toastify";
import { EventContext } from ".";
import { getEvents } from "../data";
import type { Event } from "../types";

const EventsProvider = ({ children }: { children: ReactNode }) => {
  // Store events in state
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all events from API
        const eventData = await getEvents(abortController);
        setEvents(eventData); // Save events in state
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          toast.info("Fetch Aborted");
        } else {
          const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    })();

    // Cleanup: abort API request when component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  // Provide events state to children via context
  return (
    <EventContext value={{ events, setEvents, loading, error }}>
      {children}
    </EventContext>
  );
};

export default EventsProvider;
