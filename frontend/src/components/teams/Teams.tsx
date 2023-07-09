import { DataTable } from "./dataTable/DataTable";
import { columns } from "./data/columns";
import { Task, taskSchema } from "./data/schema";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { AuthContext } from "@/context/AuthContext";

function toReqFormat(data: any) {
  const newData: any = [];
  data.forEach((element: any) => {
    const temp: any = {
      team: "",
      leader: "",
      totalMembers: 0,
      pendingTasks: 0,
      teamPoints: 0,
    };
    temp.team = element[0];

    temp.totalMembers = element[1];
    temp.pendingTasks = element[2];
    temp.teamPoints = element[3];

    newData.push(temp);
  });
  return newData;
}

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
      const newData = toReqFormat(data.value);
      return newData;
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
