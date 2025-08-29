import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return <div className="p-6 text-xl">Home Page</div>;
}
function SignIn() {
  return <div className="p-6 text-xl">Sign-In Page</div>;
}
function SignUp() {
  return <div className="p-6 text-xl">Sign-Up Page</div>;
}
function CreateEvent() {
  return <div className="p-6 text-xl">Create Event (Protected)</div>;
}
function EventDetails() {
  return <div className="p-6 text-xl">Event Details</div>;
}

export default function App() {
  return (
    <div>
      <nav className="p-4 border-b flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/sign-in">Sign In</Link>
        <Link to="/sign-up">Sign Up</Link>
        <Link to="/events/new">Create Event</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/events/new" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </div>
  );
}
