import { createContext, ReactNode, useEffect, useState } from "react";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  token: string;
  setToken: (newToken: string) => void;
  setAuthenticated: (newState: boolean) => void;
};

const initialValue = {
  authenticated: false,
  token: localStorage.getItem("token") || "",
  setToken: () => {},
  setAuthenticated: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated
  );
  const [token, setToken] = useState(initialValue.token);
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ authenticated, token, setToken, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
