import { DataTable } from "@/components/tasks/dataTable/DataTable";
import { columns } from "@/components/tasks/data/columns";
import { Task, taskSchema } from "./data/schema";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { AuthContext } from "@/context/AuthContext";

export default function Tasks() {
  const [data, setData] = useState<Task[]>([]);
  const { token, setToken } = useContext(AuthContext);
  async function getData(abortController: AbortController) {
    const res = await fetch("http://localhost:8000/task/allTaskList", {
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 401) {
      if (setToken) setToken(null);
    }
    const tasks = await res.json();
    console.log(tasks);
    tasks.data.forEach((task: any) => {
      task.priority = task.priority.toString();
    });
    return z.array(taskSchema).parse(tasks.data);
  }
  useEffect(() => {
    const abortController = new AbortController();
    getData(abortController, setToken).then(setData);
    return () => {
      abortController.abort();
    };
  }, []);
  return <DataTable columns={columns} data={data} />;
}
