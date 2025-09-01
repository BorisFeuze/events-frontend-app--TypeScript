import { useAuthor } from "../context";

const AuthLayout = () => {
  const { signedIn } = useAuthor();

  if (signedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default AuthLayout;
