import type { NewUser, SignInType } from "../types";

const API_URL = "http://localhost:3001/api";

// Sign in user with email & password
const signIn = async (form: SignInType) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form), // Send login credentials
  });
  if (!res.ok) throw new Error("Something went wrong !");

  const data = await res.json();
  return data; // Returns token + user data
};

// Get the current logged-in user (using token from localStorage)
const me = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`, // Pass token for authentication
    },
  });

  if (!res.ok) throw new Error("Something went wrong!");

  const data = await res.json();
  return data; // Returns user profile
};

// Create a new user (register)
const createUser = async (newUser: NewUser) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newUser), // Send new user details
  });

  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = await res.json();
  return data; // Returns newly created user
};

export { signIn, me, createUser };
