import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainLayout, AuthLayout } from "./layouts";
import {
  SignIn,
  SignUp,
  CreateEvent,
  EventDetails,
  Home,
  NotFound,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
