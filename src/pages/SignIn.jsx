import { Navigate, Link } from "react-router";
import { useState, useActionState } from "react";
import { signIn } from "../data";
import { toast } from "react-toastify";
import { useAuthor } from "../context";

const SignIn = () => {
  const { handleSignIn, signedIn, handleSignOut } = useAuthor();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.email.trim()) throw new Error("Email is required");
      if (!form.password.trim()) throw new Error("Password is required");

      const signInResp = await signIn(form);

      console.log(signInResp.token);
      handleSignIn(signInResp.token);

      return { error: null, success: true };
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
      return { error: null, success: false };
    }
  };

  if (signedIn) return <Navigate to="/events/new" />;

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
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>
      </div>
      <button className="btn">Sign In</button>
      <small>
        Don&apos;t have an account?{" "}
        <Link to="/sign-up" className="text-primary hover:underline">
          Register!
        </Link>
      </small>
    </form>
  );
};

export default SignIn;
