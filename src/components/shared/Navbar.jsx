import { Link } from "react-router";
const Navbar = () => {
  return (
    <nav className="border-b flex gap-4 w-full fixed">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
          </div>
          <a className="btn btn-ghost  text-black  text-xl">daisyUI</a>
        </div>
        <div className="flex flex-row justify-end w-[35rem] gap-5">
          <div>
            <Link to="/" className="btn">
              Home
            </Link>
          </div>
          <div>
            <Link to="/events/new" className="btn">
              Create Event
            </Link>
          </div>
          <div>
            <Link to="/sign-in" className="btn">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
