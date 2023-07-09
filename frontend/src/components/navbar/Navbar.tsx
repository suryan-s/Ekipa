import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { BackpackIcon, BellIcon, PlusIcon } from "@radix-ui/react-icons";
import { BellIcon, PlusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import NewTask from "./NewTask";
import NewTeam from "./NewTeam";
export default function Navbar() {
  const { setToken } = useContext(AuthContext);

  const handleLogOut = () => {
    setToken(null);
  };
  const navigate = useNavigate();
  const handleProfile = ()=>{
    navigate("/Profile")
  }
  return (
    <nav className="flex items-center justify-between flex-wrap w-full p-6 max-w-screen-2xl mx-auto">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Ekipa</span>
      </div>
      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger
            className={buttonVariants({
              variant: "secondary",
              className: "gap-1",
            })}
          >
            <BackpackIcon />
            New Team
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-6">New Team</DialogTitle>
              <NewTeam />
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger
            className={buttonVariants({
              variant: "secondary",
              className: "gap-1",
            })}
          >
            <PlusIcon />
            New Task
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-6">New Task</DialogTitle>
              <NewTask />
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Popover>
          <PopoverTrigger
            className={buttonVariants({
              className: "gap-1",
            })}
          >
            <BellIcon /> Requests
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=> handleProfile()}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLogOut()}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
