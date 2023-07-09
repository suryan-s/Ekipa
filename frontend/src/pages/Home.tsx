import Navbar from "@/components/navbar/Navbar";
import MyTasks from "@/components/mytasks/MyTasks";
import MyTeam from "@/components/myteam/MyTeam";
import Tasks from "@/components/tasks/Tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Teams from "@/components/teams/Teams";
import { useEffect, useState } from "react";

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

function DataCard({ title, content }: { title: string; content: string }) {
  return (
    <Card className="hover:bg-slate-800 hover:transition-colors">
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
  useEffect(() => {
    fetch("http://localhost:8000/user/teamDetails", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      <DataCard title="Name" content="Ekipa" />
      <DataCard title="Total Members" content="5" />
      <DataCard title="Pending Tasks" content="5" />
      <DataCard title="Completed Tasks" content="4" />
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
      <TabsContent value="teamchat">Teamchat</TabsContent>
    </Tabs>
  );
}
