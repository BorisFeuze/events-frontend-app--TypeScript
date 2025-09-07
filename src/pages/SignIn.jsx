import { Navigate, Link } from "react-router-dom"; // Correct import from react-router-dom
import { useState } from "react";
import { signIn } from "../data"; // API call function for login
import { toast } from "react-toastify"; // For showing error messages
import { useAuthor } from "../context"; // Custom context for authentication

const SignIn = () => {
  const { handleSignIn, signedIn } = useAuthor(); // Context methods

  // Local state for form fields
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Loading state to disable button

  // Handle input change for both email and password
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (loading) return; // Prevent multiple submits

    try {
      // Basic validation before sending request
      if (!form.email.trim()) throw new Error("Email is required");
      if (!form.password.trim()) throw new Error("Password is required");

      setLoading(true);

      // Call API to sign in
      const { token } = await signIn(form);

      // Save token in context (and localStorage inside context)
      handleSignIn(token);
    } catch (error) {
      // Show error toast if login fails
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // If already signed in, redirect to create-event page
  if (signedIn) return <Navigate to="/events/new" />;

  return (
    <form
      className="my-5 md:w-1/2 mx-auto flex flex-col gap-3 items-center text-black"
      onSubmit={handleSubmit}
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
            autoComplete="username"
            required
          />
        </label>
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
            placeholder="Password"
            autoComplete="current-password"
            minLength={1} // Keep minimum for login, not strict like signup
            required
          />
        </label>
      </div>

      {/* Submit button */}
      <button type="submit" className="btn" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>

      {/* Link to register page */}
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
