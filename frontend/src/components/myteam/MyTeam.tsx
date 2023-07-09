import { useContext, useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import { AuthContext } from "@/context/AuthContext";

export default function MyTeam() {
  const { setToken } = useContext(AuthContext);
  const [fData, setFdata] = useState<any>([]);
  useEffect(() => {
    const abortController = new AbortController();
    fetch("http://localhost:8000/user/teamMembers", {
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          if (setToken) setToken(null);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setFdata(data.value);
      });
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      {fData.map((item: any) => (
        <MemberCard
          name={item[2]}
          tasksOnProgress={item[3]}
          pendingTasks={item[1]}
        />
      ))}
    </div>
  );
}
