const API_URL = "http://localhost:3001/api";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const getEvents = async (abortC) => {
  const resp = await fetch(`${API_URL}/events`, {
    ...options,
    signal: abortC.signal,
  });
  // get a Error message back if something goes wrong
  if (!resp.ok)
    throw new Error(
      `${resp.status} .Something went wrong! Error ${resp.status}`
    );

  const data = await resp.json();

  console.log(data);

  //gives data from popular movies back for using it in other function
  return data;
};

const getSingleEvent = async (eventId, abortC) => {
  const res = await fetch(`${API_URL}/events/${eventId}`, {
    ...options,
    signal: abortC.signal,
  });
  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = await res.json();

  return data;
};

export { getEvents, getSingleEvent };
