import { z } from "zod/v4";
import { EventSchema } from "../schemas";
import type { Dispatch, SetStateAction } from "react";

type NewUser = SignInType & {
  confpassword?: string;
};

type SignInType = {
  email: string;
  password: string;
};

type EventContextType = {
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  loading: boolean;
  error: string | null;
};

type AuthorizContextType = {
  signedIn: boolean;
  user: SignInType | null;
  handleSignIn: (token: string) => void;
  handleSignOut: () => void;
};

type Event = z.infer<typeof EventSchema>;

export type {
  Event,
  NewUser,
  SignInType,
  EventContextType,
  AuthorizContextType,
};
