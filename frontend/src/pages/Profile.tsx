import Editor from "@/components/profile/Editor";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "@/context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  function onButtonClick() {
    navigate("/");
  }
  // const [val, setVal] = useState<any[]>([]);
  // const { token, setToken } = useContext(AuthContext);
  // useEffect(() => {
  //   fetch("http://localhost:8000/user/", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status === 401) {
  //         setToken(null);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setVal(data);
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  return (
    <div className="p-6 flex flex-col gap-5">
      <div className="flex flex-row items-center gap-3 w-18">
        <Button variant="outline" size="icon" onClick={onButtonClick}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Button>
        <div className=" text-white mr-6 text-bold text-2xl">My Profile</div>
      </div>
      <div className="flex flex-row gap-5">
        <Avatar className="h-36 w-36 rounded-sm">
          <AvatarImage src="https://github.com/suryan-s.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col mt-20 ">
          <div className="text-2xl font-semibold">S Suryan</div>
          <div>Ph.No : 7786952421</div>
        </div>
      </div>
      <div>
        <div className="text-xl font-bold">Personal Information</div>
        <div className="mt-4 w-full flex flex-row justify-between">
          <div className="text-lg font-semibold ">
            Address
            <div className="text-sm font-medium w-96 h-10 border rounded-md border-solid p-2">
              Somewhere in, aruvikara
            </div>
          </div>
          <div className="text-lg font-semibold ">
            City
            <div className="text-sm font-medium w-80 h-10 border rounded-md border-solid p-2 ">
              Thrivananthapuram
            </div>
          </div>
          <div className="text-lg font-semibold ">
            State
            <div className="text-sm font-medium w-80 h-10 border rounded-md border-solid p-2">
              Kerala
            </div>
          </div>
          <div className="text-lg font-semibold">
            Country
            <div className="text-sm font-medium w-80 h-10 border rounded-md border-solid p-2">
              India
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-1 w-full flex flex-row gap-2">
          <div className="text-lg font-semibold w-1/3">
            Email
            <div className="text-sm font-medium w-full h-10 border rounded-md border-solid p-2">
              suryananannan@gmail.com
            </div>
          </div>
          <div className="text-lg font-semibold w-2/3">
            Skills
            <div className="text-sm font-medium w-full h-10 border rounded-md border-solid p-2 ">
              Skill1, skill2, Skill3
            </div>
          </div>
        </div>
      </div>
      <Editor></Editor>
    </div>
  );
}
