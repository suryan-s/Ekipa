import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-screen-2xl mx-auto p-6">
        <h2 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
          Welcome Onboard!
        </h2>
        <DetailGrid />
      </main>
    </>
  );
}

function DetailGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      <DataCard title="Name" content="Ekipa" />
      <DataCard title="Total Members" content="5" />
      <DataCard title="Pending Tasks" content="5" />
      <DataCard title="Completed Tasks" content="4" />
    </div>
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
