import { EventSchemaArray, EventSchema } from "../schemas";
import type { NewUser } from "../types";

const API_URL = "http://localhost:3001/api";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const getEvents = async (abortC: AbortController) => {
  const resp = await fetch(`${API_URL}/events`, {
    ...options,
    signal: abortC.signal,
  });
  // get a Error message back if something goes wrong
  if (!resp.ok)
    throw new Error(
      `${resp.status} .Something went wrong! Error ${resp.status}`
    );

  const respData = await resp.json();

  const { success, data, error } = EventSchemaArray.safeParse(respData.results);

  if (!success) {
    console.error(error.message);
    throw new Error("Data validation failed");
  }

  //gives data from popular movies back for using it in other function
  return data;
};

const getSingleEvent = async (eventId: number, abortC: AbortController) => {
  const res = await fetch(`${API_URL}/events/${eventId}`, {
    ...options,
    signal: abortC.signal,
  });
  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const resData = await res.json();

  const { success, data, error } = EventSchema.safeParse(resData);

  if (!success) {
    console.error(error.message);
    throw new Error("Data validation failed");
  }

  return data;
};

const createEvent = async (newEvent: NewUser) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newEvent),
  });

  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const resData = await res.json();

  const { success, data, error } = EventSchema.safeParse(resData);

  if (!success) {
    console.error(error.message);
    throw new Error("Data validation failed");
  }

  return data;
};

export { getEvents, getSingleEvent, createEvent };
