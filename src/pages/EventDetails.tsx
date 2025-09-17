import { useState, useEffect } from "react";
import { getSingleEvent } from "../data";
import { useParams, useNavigate } from "react-router";
import type { Event } from "../types";
import { toast } from "react-toastify";

const EventDetails = () => {
  const [currEvent, setCurrEvent] = useState<Event | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  if (!currEvent) return;
  const { date, title, description, location, updatedAt } = currEvent;

  // Handle "Go Back" button, navigate to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const abortController = new AbortController();

    // Fetch a single event by ID when component mounts
    (async () => {
      try {
        const currEventData = await getSingleEvent(id ?? "", abortController);
        setCurrEvent(currEventData); // Update state with event data
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          toast.info("Fetch Aborted");
        } else {
          const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
          toast.error(errorMessage);
        }
      }
    })();

    // Cleanup: abort fetch if component unmounts

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="flex flex-row justify-center pt-[7rem]">
      <div className="card card-border text-black bg-base-100 w-96">
        <div className="card-body">
          {/* Event details */}
          <p>{date}</p>
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <p>{location}</p>
          </div>
          <p>{updatedAt}</p>

          {/* Back button */}
          <button
            onClick={handleGoBack}
            className="btn bg-black text-white hover:bg-gray-800"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
