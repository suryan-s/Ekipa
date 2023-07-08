import { createContext, ReactNode, useEffect, useState } from "react";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  token: string | null;
  setToken: (newToken: string | null) => void;
  roles: string[];
};

const initialValue = {
  token: localStorage.getItem("token") || null,
  setToken: () => {},
  roles: [],
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [token, setToken] = useState(initialValue.token);
  const roles: string[] = initialValue.roles;
  useEffect(() => {
    localStorage.setItem("token", token || "");
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, roles }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
