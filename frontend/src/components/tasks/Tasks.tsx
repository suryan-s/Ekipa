import { DataTable } from "@/components/tasks/dataTable/DataTable";
import { columns } from "@/components/tasks/data/columns";
import { taskSchema } from "@/components/tasks/data/schema";
import { useEffect, useState } from "react";
import { Task, tasks } from "@/components/tasks/data/tasks";
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
