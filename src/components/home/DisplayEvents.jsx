import { Link } from "react-router";
import { useOutletContext } from "react-router";
import { useEvent } from "../../context";

const DisplayEvents = () => {
  // const { events } = useOutletContext();
  return (
    <div>
      {/* {events.map((e) => {
        <Link to={`/events/${e.id}`} key={e.id}>
          <EventCard {...e} />
        </Link>;
      })} */}
    </div>
  );
};

export default DisplayEvents;
