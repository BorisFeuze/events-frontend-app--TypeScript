import { useState, useEffect } from "react";
import { getSingleEvent } from "../data";
import { useParams } from "react-router";

const EventDetails = () => {
  const [currEvent, setCurrEvent] = useState({});

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const currEventData = await getSingleEvent(id, abortController);
        console.log(currEventData);
        setCurrEvent(currEventData);
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
