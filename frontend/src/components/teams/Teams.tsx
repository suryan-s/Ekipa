import { DataTable } from "./dataTable/DataTable";
import { columns } from "./data/columns";
import { Task, taskSchema } from "./data/schema";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { AuthContext } from "@/context/AuthContext";
async function getData(setToken?: any) {
  const res = await fetch("http://localhost:8000/user/allTeamDetails", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          if (setToken) setToken(null);
        }
        throw new Error("HTTP Error " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
  return z.array(taskSchema).parse(res);
}
export default function Teams() {
  const [data, setData] = useState<Task[]>([]);
  const { setToken } = useContext(AuthContext);
  useEffect(() => {
    getData(setToken).then(setData);
  }, []);
  return <DataTable columns={columns} data={data} />;
}
