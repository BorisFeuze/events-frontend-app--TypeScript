import { Link } from "react-router";
import { useOutletContext } from "react-router";
import { useEvent } from "../../context";
import EventCard from "../EventCard";

const DisplayEvents = () => {
  const { events } = useEvent();
  return (
    <div>
      {events.map((event) => {
        <Link to={`/events/${event.id}`} key={event.id}>
          <EventCard event={event} />
        </Link>;
      })}
    </div>
  );
};

export default DisplayEvents;
