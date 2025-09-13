import { Navigate, Link } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { createUser } from "../data";

const SignUp = () => {
  // Local state for form fields
  const [form, setForm] = useState({
    email: "",
    password: "",
    confpassword: "",
  });

  // Store newly created user (used to redirect later)
  const [newUser, setNewUser] = useState("");
  const [loading, setLoading] = useState(false);

  // Update form state when user types
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.value);
  };

  // Handle form submission
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      // Basic validations
      if (!form.email.trim()) throw new Error("Email is required");
      if (!form.password.trim()) throw new Error("Password is required");
      if (!form.confpassword.trim())
        throw new Error("Confirm Password is required");
      if (form.confpassword.trim() !== form.password.trim())
        throw new Error("Confirm Password and Password must be the same");

      // Destructure data to send

      setLoading(true);

      const { email, password } = form;

      // API call to create user
      const updateUser = await createUser({ email, password });

      setNewUser(updateUser);

      // Reset form after successful registration
      setForm({
        email: "",
        password: "",
        confpassword: "",
      });

      toast.success("You have been successfully registered");
    } catch (error) {
      // Show error message if something fails
      toast.error(error.message || "Something went wrong!");
    }
  };

  // Redirect to sign-in page after registration
  if (newUser) return <Navigate to="/sign-in" />;

  return (
    <form
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-3 items-center text-black"
      onSubmit={handelSubmit}
    >
      {/* Email input */}
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

      {/* Password input */}
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
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <div className="validator-hint hidden">Enter valid password</div>
      </div>

      {/* Confirm password input */}
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
            minLength="8"
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

      {/* Submit button */}
      <button className="btn">Register</button>
      <small className="text-center">
        Already have an account?{" "}
        <Link to="/sign-in" className="link link-primary">
          Sign In
        </Link>
      </small>
    </form>
  );
};

export default SignUp;
