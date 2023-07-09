import { DataTable } from "./dataTable/DataTable";
import { columns } from "./data/columns";
import { Task, taskSchema } from "./data/schema";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { AuthContext } from "@/context/AuthContext";
async function getData(abortController: AbortController, setToken?: any) {
  const res = await fetch("http://localhost:8000/task/myTaskList", {
    signal: abortController.signal,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status === 401) {
    if (setToken) setToken(null);
  }
  const tasks = await res.json();
  console.log(tasks);
  return z.array(taskSchema).parse(tasks);
}
export default function MyTasks() {
  const [data, setData] = useState<Task[]>([]);
  const { setToken } = useContext(AuthContext);
  useEffect(() => {
    const abortController = new AbortController();
    getData(abortController, setToken).then(setData);
    return () => {
      abortController.abort();
    };
  }, []);
  return <DataTable columns={columns} data={data} />;
}
