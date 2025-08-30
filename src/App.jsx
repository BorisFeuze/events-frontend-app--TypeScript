import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/Mainlayout";
import {
  SignIn,
  SignUp,
  CreateEvent,
  EventDetails,
  Home,
} from "./components/pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route index element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/events/new" element={<CreateEvent />} />
      <Route path="/events/:id" element={<EventDetails />} />
    </Routes>
  );
};

export default App;
