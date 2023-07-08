"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "../dataTable/data-table-column-header";
import { DataTableRowActions } from "../dataTable/data-table-row-actions";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "team",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("team")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "leader",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Leader" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("leader")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalMembers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Members" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("totalMembers")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "pendingTasks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pending Tasks" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("pendingTasks")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "teamPoints",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team Points" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("teamPoints")}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
