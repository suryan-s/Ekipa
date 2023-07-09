import { DataTable } from "./dataTable/DataTable";
import { columns } from "./data/columns";
import { Task, taskSchema } from "./data/schema";
import { useEffect, useState } from "react";
import { z } from "zod";
async function getData(abortController: AbortController) {
  const res = await fetch("http://localhost:8000/task/myTaskList", {
    signal: abortController.signal,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const tasks = await res.json();
  console.log(tasks);
  return z.array(taskSchema).parse(tasks);
}
export default function MyTasks() {
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
