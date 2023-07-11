import Navbar from "@/components/navbar/Navbar";
import MyTasks from "@/components/mytasks/MyTasks";
import MyTeam from "@/components/myteam/MyTeam";
import Tasks from "@/components/tasks/Tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Teams from "@/components/teams/Teams";
import { useContext, useEffect, useState } from "react";
import TeamChat from "@/components/teamchat/TeamChat";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto p-6">
        <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          Welcome Onboard!
        </h2>
        <DetailGrid />
        <TabSection />
      </main>
    </>
  );
}
interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
}
function DataCard({ title, content, ...props }: DataCardProps) {
  return (
    <Card className="hover:bg-slate-800 hover:transition-colors" {...props}>
      <CardHeader>
        <CardTitle className="opacity-80">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-5 justify-between flex-wrap">
        <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {content}
        </p>
        {/* <Badge>+2.5%</Badge> */}
      </CardContent>
    </Card>
  );
}

function DetailGrid() {
  const [data, setData] = useState<any[]>([]);
  const { token, setToken } = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:8000/user/teamDetails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          setToken(null);
        }
        return res.json();
      })
      .then((data) => {
        setData(data.value[0]);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  if (data.length === 0 || !data || data === undefined || data === null) {
    return <p>Loading...</p>;
  }
  if (data[0] === null || data[0] === undefined || data[0] === "") {
    return (
      <DataCard
        title="Information"
        content="You are not currently allocated to a team! Make sure to communicate this."
        className="mt-6"
      />
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      <DataCard title="Name" content={data[0]} />
      <DataCard title="Total Members" content={data[1]} />
      <DataCard title="Pending Tasks" content={data[2]} />
      <DataCard title="Completed Tasks" content={data[3]} />
    </div>
  );
}
function TabSection() {
  return (
    <Tabs defaultValue="tasks" className="mt-6">
      <TabsList>
        <TabsTrigger value="teams">Teams</TabsTrigger>
        <TabsTrigger value="myteam">My Team</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="mytasks">My Tasks</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="teamchat">Teamchat</TabsTrigger>
      </TabsList>
      <TabsContent value="teams">
        <Teams />
      </TabsContent>
      <TabsContent value="myteam">
        <MyTeam />
      </TabsContent>
      <TabsContent value="tasks">
        <Tasks />
      </TabsContent>
      <TabsContent value="mytasks">
        <MyTasks />
      </TabsContent>
      <TabsContent value="notifications">Notifications</TabsContent>
      <TabsContent value="teamchat">
        <TeamChat />
      </TabsContent>
    </Tabs>
  );
}
