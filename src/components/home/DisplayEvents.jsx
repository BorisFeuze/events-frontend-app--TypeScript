import { Link } from "react-router";
import { useOutletContext } from "react-router";
import { useEvent } from "../../context";
import { EventCard } from "../index.js";

const DisplayEvents = () => {
  const { events } = useEvent();
  console.log(events);
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-10 text-black border-1">
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
