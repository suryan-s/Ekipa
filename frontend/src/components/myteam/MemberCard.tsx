import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

export default function MemberCard({
  name,
  tasksOnProgress,
  pendingTasks,
  backlogs,
}: {
  name: string;
  tasksOnProgress: number;
  pendingTasks: number;
  backlogs: number;
}) {
  return (
    <Card className="relative">
      <CardHeader className="flex-row items-center gap-3">
        <Avatar>
          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Tasks on progress:</p>
        <p className="text-2xl">{tasksOnProgress}</p>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <div className="flex gap-3">
          <p>Pending tasks:</p>
          <p>{pendingTasks}</p>
        </div>
        <div className="flex gap-3">
          <p>Backlogs:</p>
          <p>{backlogs}</p>
        </div>
      </CardFooter>
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute hover:bg-slate-900 p-3 rounded-full top-0 right-0 m-5">
          <DotsVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Remove</DropdownMenuItem>
          <DropdownMenuItem>Message</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
