import { createContext, use, useContext } from "react";
import EventsProvider from "./EventsProvider";

const EventContext = createContext();

const useEvent = () => {
  const context = use(EventContext);
  console.log(context);
  if (!context) throw new Error("useEvent must be used within a EventContext");
  return context;
};

export { EventsProvider, EventContext, useEvent };
