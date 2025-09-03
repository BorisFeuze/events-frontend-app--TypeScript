import { Routes, Route } from "react-router-dom";
import { MainLayout, AuthLayout } from "./layouts";
import { SignIn, SignUp, CreateEvent, EventDetails, Home } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events/new" element={<AuthLayout />}>
          <Route index element={<CreateEvent />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
