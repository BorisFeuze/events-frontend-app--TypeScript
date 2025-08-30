import { Link } from "react-router";
const Navbar = () => {
  return (
    <nav className="p-4 border-b flex gap-4">
      <Link to="/">Home</Link>
      <Link to="/sign-in">Sign In</Link>
      <Link to="/sign-up">Sign Up</Link>
      <Link to="/events/new">Create Event</Link>
    </nav>
  );
};

export default Navbar;
