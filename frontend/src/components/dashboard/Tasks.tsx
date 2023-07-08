import { DataTable } from "@/components/ui/DataTable";
import { Payment, columns } from "@/lib/dashboard/columns";
import { useEffect, useState } from "react";
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}
export default function Tasks() {
  const [data, setData] = useState<Payment[]>([]);
  useEffect(() => {
    getData().then(setData);
  }, []);
  return <DataTable columns={columns} data={data} />;
}
