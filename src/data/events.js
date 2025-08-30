const API_URL = "http://localhost:3001/api";

const options = {
  method: "GET",
  hearder: {
    accept: "application/json",
  },
};

const getEvents = async (abortC) => {
  const resp = await fetch(`${API_URL}/events`, {
    ...options,
    signal: abortC.signal,
  });
  // get a Error message back if something goes wrong
  if (!resp.ok) throw new Error(`Something went wrong! Error ${resp.status}`);

  const data = await resp.json();
  console.log(data);
  //gives data from popular movies back for using it in other function
  return data;
};

export { getEvents };
