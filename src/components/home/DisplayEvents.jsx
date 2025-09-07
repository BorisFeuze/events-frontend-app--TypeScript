import { Link } from "react-router";
import { useEvent } from "../../context";
import { EventCard } from "../index.js";

const DisplayEvents = () => {
  const { events } = useEvent();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full text-black">
      {events.map((event) => {
        return (
          <Link to={`/events/${event.id}`} key={event.id}>
            <EventCard event={event} />
          </Link>
        );
      })}
    </div>
  );
};

export default DisplayEvents;
