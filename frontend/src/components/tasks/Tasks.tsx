import { DataTable } from "@/components/tasks/dataTable/DataTable";
import { columns } from "@/components/tasks/data/columns";
import { Task, taskSchema } from "./data/schema";
import { useEffect, useState } from "react";
import { tasks } from "@/components/tasks/data/tasks";
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
