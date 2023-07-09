import { useEffect } from "react";
import MemberCard from "./MemberCard";

export default function MyTeam() {
  useEffect(() => {
    const abortController = new AbortController();
    fetch("http://localhost:8000/user/teamMembers", {
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      <MemberCard
        name="Suryan"
        tasksOnProgress={5}
        pendingTasks={1}
        backlogs={4}
      />
      <MemberCard
        name="Akash"
        tasksOnProgress={5}
        pendingTasks={1}
        backlogs={4}
      />
    </div>
  );
}
