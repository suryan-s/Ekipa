import { createContext, ReactNode, useEffect, useState } from "react";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  token: string | null;
  setToken: (newToken: string | null) => void;
  roles: string;
  setRoles: () => void;
  team: string | null;
  setTeam: (newTeam: string | null) => void;
};

const initialValue = {
  token: localStorage.getItem("token") || null,
  setToken: () => {},
  roles: "",
  setRoles: () => {},
  team: localStorage.getItem("team") || null,
  setTeam: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [token, setToken] = useState(initialValue.token);
  const [roles, _setRoles] = useState(initialValue.roles);
  const [team, setTeam] = useState(initialValue.team);
  useEffect(() => {
    localStorage.setItem("token", token || "");
  }, [token]);
  useEffect(() => {
    localStorage.setItem("roles", roles || "");
  }, [roles]);
  const setRoles = () => {
    fetch("http://localhost:8000/user/roles", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((roles) => {
        // _setRoles(roles);
        _setRoles("admin");
        console.log(roles);
      });
  };
  return (
    <AuthContext.Provider
      value={{ token, setToken, roles, setRoles, team, setTeam }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
