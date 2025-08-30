import { useState, useEffect } from "react";
import { EventContext } from "./index.js";
import { getEvents } from "../data/events.js";

const EventsProvider = ({ children }) => {
  return <EventContext value={{ events, setEvents }}>{children}</EventContext>;
};

export default EventsProvider;
