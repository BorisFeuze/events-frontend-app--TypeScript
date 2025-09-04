import { Navigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { createUser } from "../data";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confpassword: "",
  });

  const [newUser, setNewUser] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.email.trim()) throw new Error("Email is required");
      if (!form.password.trim()) throw new Error("Password is required");
      if (!form.confpassword.trim())
        throw new Error("confirm Password is required");
      if (form.confpassword.trim() !== form.password.trim())
        throw new Error("confirm Password and Password must be the same");

      const { email, password } = form;

      const updateUser = await createUser({ email, password });

      setNewUser(updateUser);

      setForm({
        email: "",
        password: "",
        confpassword: "",
      });
      toast.success("you have been sucessfully register");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  if (newUser) return <Navigate to="/sign-in" />;

  return (
    <form
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-3 items-center text-black"
      onSubmit={handelSubmit}
    >
      <div>
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="mail@site.com"
            required
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>
      </div>
      <div>
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            required
            placeholder="Password"
            minlength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <div className="validator-hint hidden">Enter valid password</div>
      </div>
      <div>
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            name="confpassword"
            value={form.confpassword}
            onChange={handleChange}
            type="password"
            required
            placeholder="Confirm Password"
            minlength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>
      </div>
      <button className="btn">Register</button>
    </form>
  );
};

export default SignUp;
