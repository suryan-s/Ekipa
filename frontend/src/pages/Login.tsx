import { Button } from "@/components/ui/button";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Username must be at least 8 characters.",
  }),
});


const Login = () => {
  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    setToken("1234");
    navigate("/");
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <div className="text-2xl font-black ">Ekipa</div>
      <div className="flex flex-col items-center">
      <div className="font-bold text-2xl">Welcome Back!</div>
      <div className="text-gray-500 text-sm">Log Into your Account</div>
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="w-96" placeholder="enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem> 
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="enter password" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem> 
          )}
        />
        <Button type="submit" className="w-96 bg-purple-800 text-white" >Submit</Button>
      </form>
    </Form>
    </div>
  );
};

export default Login;
