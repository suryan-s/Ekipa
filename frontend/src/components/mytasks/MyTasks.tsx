import { DataTable } from "./dataTable/DataTable";
import { columns } from "./data/columns";
import { Task, taskSchema } from "./data/schema";
import { useEffect, useState } from "react";
import { tasks } from "./data/tasks";
import { z } from "zod";
async function getData() {
  return z.array(taskSchema).parse(tasks);
}
export default function MyTasks() {
  const [data, setData] = useState<Task[]>([]);
  useEffect(() => {
    getData().then(setData);
  }, []);
  return <DataTable columns={columns} data={data} />;
}
