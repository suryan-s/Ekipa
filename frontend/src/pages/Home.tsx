import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { setToken } = useContext(AuthContext);

  const handleLogOut = () => {
    setToken(null);
  };
  return (
    <>
      <Button>Click home</Button>
      <Button onClick={() => handleLogOut()}>Log out</Button>
    </>
  );
}
