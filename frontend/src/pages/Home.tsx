import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { setAuthenticated } = useContext(AuthContext);

  const handleLogOut = () => {
    setAuthenticated(false);
  };
  return (
    <>
      <Button>Click home</Button>
      <Button onClick={() => handleLogOut()}>Log out</Button>
    </>
  );
}
