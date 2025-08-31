import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useEvent } from "../context";
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
    <div className="card card-border bg-base-100 w-96">
      <div className="card-body">
        <h2 className="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
