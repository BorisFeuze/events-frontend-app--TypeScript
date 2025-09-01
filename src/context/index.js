import { createContext, use, useContext } from "react";
import EventsProvider from "./EventsProvider";
import AuthProvider from "./AuthProvider";

const EventContext = createContext();

const useEvent = () => {
  const context = use(EventContext);
  if (!context) throw new Error("useEvent must be used within a EventContext");
  return context;
};

const AuthorizContext = createContext();

const useAuthor = () => {
  const context = use(AuthorizContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthContextProvider");
  return context;
};

export {
  EventsProvider,
  EventContext,
  useEvent,
  AuthProvider,
  useAuthor,
  AuthorizContext,
};
