import { Link } from "react-router-dom";
import { useAuthor } from "../../context";

const Navbar = () => {
  const { handleSignOut, signedIn } = useAuthor();

  // close dropdown after clicking a link
  const handleCloseMenu = () => {
    const activeElement = document.activeElement;
    if (activeElement && activeElement.blur) {
      activeElement.blur(); // close dropdown by removing focus
    }
  };

  return (
    <nav className="navbar fixed top-0 z-50 w-full bg-white/95 backdrop-blur border-b shadow-sm">
      {/* Left: brand + mobile menu */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-56"
          >
            <li>
              <Link
                to="/"
                onClick={handleCloseMenu}
                className="btn btn-sm bg-slate-800 text-white hover:-translate-y-0.5 hover:shadow-md transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/events/new"
                onClick={handleCloseMenu}
                className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-md transition"
              >
                Create Event
              </Link>
            </li>
            <li>
              {signedIn ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    handleCloseMenu();
                  }}
                  className="btn btn-sm bg-rose-600 text-white hover:bg-rose-700 hover:-translate-y-0.5 hover:shadow-md transition"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  to="/sign-in"
                  onClick={handleCloseMenu}
                  className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-md transition"
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Brand */}
        <Link to="/" className="btn btn-ghost text-xl font-bold text-slate-900">
          Events-Frontend
        </Link>
      </div>

      {/* Right: desktop links */}
      <div className="navbar-end hidden lg:flex">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="btn bg-slate-800 text-white hover:-translate-y-0.5 hover:shadow-md transition"
          >
            Home
          </Link>

          <Link
            to="/events/new"
            className="btn bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-0.5 hover:shadow-md transition"
          >
            Create Event
          </Link>

          {signedIn ? (
            <button
              onClick={handleSignOut}
              className="btn bg-rose-600 text-white hover:bg-rose-700 hover:-translate-y-0.5 hover:shadow-md transition"
            >
              Sign out
            </button>
          ) : (
            <Link
              to="/sign-in"
              className="btn bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-md transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
