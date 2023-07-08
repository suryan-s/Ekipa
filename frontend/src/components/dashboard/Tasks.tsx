import { DataTable } from "@/components/dashboard/DataTable";
import { columns } from "@/components/dashboard/dataTable/columns";
import { taskSchema } from "@/components/dashboard/data/schema";
import { useEffect, useState } from "react";
import { Task, tasks } from "@/components/dashboard/data/tasks";
import { z } from "zod";
async function getData() {
  return z.array(taskSchema).parse(tasks);
}
export default function Tasks() {
  const [data, setData] = useState<Task[]>([]);
  useEffect(() => {
    getData().then(setData);
  }, []);
  return <DataTable columns={columns} data={data} />;
}
