import type { Event } from "../types";

const EventCard = ({ event }: { event: Event }) => {
  const { title, description, location } = event;
  return (
    <div className="card card-border bg-base-100 w-96">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
