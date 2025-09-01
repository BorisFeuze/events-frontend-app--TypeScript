import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useEvent } from "../context";
import { getSingleEvent } from "../data/events";

const EventDetails = () => {
  const [currEvent, setCurrEvent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        const event = await getSingleEvent(id, abortController);
        console.log(event);
        setCurrEvent(event);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    })();
  }, []);

  if (!currEvent) return <div>Sorry, no event found</div>;
  return (
    <div className="card card-border text-black bg-base-100 w-96">
      <div className="card-body">
        <p>{currEvent.date}</p>
        <h2 className="card-title">{currEvent.title}</h2>
        <p>{currEvent.description}</p>
        <div className="card-actions justify-end">
          <p>{currEvent.location}</p>
        </div>
        <p>{currEvent.updatedAt}</p>
      </div>
    </div>
  );
};

export default EventDetails;
