import { useState, useEffect } from "react";
import { getSingleEvent } from "../data";
import { useParams, useNavigate } from "react-router";

const EventDetails = () => {
  const [currEvent, setCurrEvent] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // Handle "Go Back" button, navigate to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const abortController = new AbortController();

    // Fetch a single event by ID when component mounts
    (async () => {
      try {
        const currEventData = await getSingleEvent(id, abortController);
        setCurrEvent(currEventData); // Update state with event data
      } catch (error) {
        if (error.name === "AbortError") {
          console.info("Fetch Aborted");
        } else {
          console.error(error);
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
          <p>{currEvent.date}</p>
          <h2 className="card-title">{currEvent.title}</h2>
          <p>{currEvent.description}</p>
          <div className="card-actions justify-end">
            <p>{currEvent.location}</p>
          </div>
          <p>{currEvent.updatedAt}</p>

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
