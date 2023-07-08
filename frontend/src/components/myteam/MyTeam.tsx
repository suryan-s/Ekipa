import MemberCard from "./MemberCard";

export default function MyTeam() {
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
