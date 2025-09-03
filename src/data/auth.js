const API_URL = "http://localhost:3001/api";

const signIn = async (form) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  if (!res.ok) throw new Error("Something went wrong!");

  const data = await res.json();

  return data;
};

const me = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Something went wrong!");

  const data = await res.json();

  return data;
};

const createUser = async (newUser) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = await res.json();

  return data;
};

export { signIn, me, createUser };
