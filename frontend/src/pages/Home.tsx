import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { setToken } = useContext(AuthContext);

  const handleLogOut = () => {
    setToken(null);
  };
  return (
    <>
      <Navbar />
    </>
  );
}
