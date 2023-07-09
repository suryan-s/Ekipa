import { DataTable } from "./dataTable/DataTable";
import { columns } from "./data/columns";
import { Task, taskSchema } from "./data/schema";
import { useEffect, useState } from "react";
import { z } from "zod";
async function getData() {
  const res = await fetch("http://localhost:8000/user/allTeamDetails", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return z.array(taskSchema).parse(res);
}
export default function Teams() {
  const [data, setData] = useState<Task[]>([]);
  useEffect(() => {
    getData().then(setData);
  }, []);
  return <DataTable columns={columns} data={data} />;
}
