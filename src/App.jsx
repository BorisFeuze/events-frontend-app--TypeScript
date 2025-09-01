import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./components/layouts/Mainlayout";
import { SignIn, SignUp, CreateEvent, EventDetails } from "./components/pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route index element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/events/new" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
