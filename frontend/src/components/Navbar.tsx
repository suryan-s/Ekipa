import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { BellIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap w-full p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Ekipa</span>
      </div>
      <div className="flex items-center">
        <div className="mr-6">
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
        </div>
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/suryan-s.png" />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
