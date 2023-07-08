import { Button } from "@/components/ui/button";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    setToken("1234");
    navigate("/");
  };

  return (
    <div>
      <Button onClick={() => handleLogin()}>Authenticate</Button>
    </div>
  );
};

export default Login;
