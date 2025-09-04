import { useState, useEffect } from "react";
import { getSingleEvent } from "../data";
import { useParams, useNavigate } from "react-router";

const EventDetails = () => {
  const [currEvent, setCurrEvent] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        const currEventData = await getSingleEvent(id, abortController);
        setCurrEvent(currEventData);
      } catch (error) {
        if (error.name === "AbortError") {
          toast.info("Fetch Aborted");
        } else {
          toast.error(error.message || "Something went wrong");
        }
      }
    })();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div className="flex flex-row justify-center pt-[7rem]">
      <div className="card card-border text-black bg-base-100 w-96">
        <div className="card-body">
          <p>{currEvent.date}</p>
          <h2 className="card-title">{currEvent.title}</h2>
          <p>{currEvent.description}</p>
          <div className="card-actions justify-end">
            <p>{currEvent.location}</p>
          </div>
          <p>{currEvent.updatedAt}</p>
          <button onClick={handleGoBack} className="btn">
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
