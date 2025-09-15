import { useState, useEffect, type ReactNode } from "react";
import { toast } from "react-toastify";
import { AuthorizContext } from ".";
import { me } from "../data";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Track authentication state
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [checkSession, setCheckSession] = useState(true);

  // Handle sign-in: save token and update state
  const handleSignIn = (token: string) => {
    localStorage.setItem("token", token);
    setSignedIn(true);
    setCheckSession(true); // Trigger session check
  };

  // Handle sign-out: clear token and reset state
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setSignedIn(false);
    setUser(null);
  };

  // On mount (or when checkSession changes), verify if user is logged in
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await me(); // Get user profile from API
        setUser(data);
        setSignedIn(true);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Something went wrong ";
        toast.error(errorMessage);
      } finally {
        setCheckSession(false); // Stop checking session after attempt
      }
    };

    if (checkSession) getUser();
  }, [checkSession]);

  return (
    <AuthorizContext
      value={{
        signedIn,
        user,
        handleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </AuthorizContext>
  );
};

export default AuthProvider;
