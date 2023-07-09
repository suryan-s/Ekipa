import { DataTable } from "@/components/tasks/dataTable/DataTable";
import { columns } from "@/components/tasks/data/columns";
import { Task, taskSchema } from "./data/schema";
import { useEffect, useState } from "react";
import { z } from "zod";
async function getData(abortController: AbortController) {
  const res = await fetch("http://localhost:8000/task/allTaskList", {
    signal: abortController.signal,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const tasks = await res.json();
  console.log(tasks);
  return z.array(taskSchema).parse(tasks);
}
export default function Tasks() {
  const [data, setData] = useState<Task[]>([]);
  useEffect(() => {
    const abortController = new AbortController();
    getData(abortController).then(setData);
    return () => {
      abortController.abort();
    };
  }, []);
  return <DataTable columns={columns} data={data} />;
}
