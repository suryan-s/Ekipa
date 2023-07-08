import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function MemberCard() {
  return (
    <Card className="relative">
      <CardHeader className="flex-row items-center gap-3">
        <Avatar>
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Tasks on progress:</p>
        <p className="text-2xl">5</p>
      </CardContent>
      <CardFooter className="flex-col items-start">
        <div className="flex gap-3">
          <p>Pending tasks:</p>
          <p>1</p>
        </div>
        <div className="flex gap-3">
          <p>Backlogs:</p>
          <p>3</p>
        </div>
      </CardFooter>
    </Card>
  );
}
