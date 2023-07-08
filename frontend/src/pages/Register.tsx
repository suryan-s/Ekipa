import { Button } from "@/components/ui/button";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as z from "zod";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 8 characters.",
  }),
  firstname: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  lastname: z.string().min(1, {
    message: "lastname must be at least 1 characters.",
  }),
  email: z.string().min(1, {
    message: "please enter valid email",
  }),
  phonenumber: z.string().min(7, {
    message: "phonenumber must be at least 7 characters.",
  }),
  address: z.string().min(1, {
    message: "address cannot be empty.",
  }),
  zipcode: z.string().min(1, {
    message: "zipcode should not be empty",
  }),
  city: z.string().min(1, {
    message: "city should not be empty",
  }),
  state: z.string().min(2, {
    message: "state should not be empty",
  }),
  country: z.string().min(2, {
    message: "country shouls not be empty",
  }),
  teamname: z.string({
    required_error: "please select a team name.",
  }),
  role: z.string({
    required_error: "please select a role.",
  }),
  skills: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Register = () => {
  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegister = (values: z.infer<typeof formSchema>) => {
    fetch("http://localhost:8000/register/signup", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    setToken("1234");
    console.log(values);
    navigate("/");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
    // password: z.string().min(8, {
    //   message: "Username must be at least 8 characters.",
    // }),
  });

  return (
    <div className="flex flex-col justify-center items-center gap-3 my-12 ">
      <div className="text-2xl font-black ">Ekipa</div>
      <div className="flex flex-col items-center ">
        <div className="font-bold text-2xl">Create A New Account!</div>
        <div className="text-gray-500 text-sm">
          please enter your credentials properly to create a new account in
          ekipa
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="space-y-8"
        >
          <div className="sm:flex flex-row gap-7">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      className="w-56 sm:w-96"
                      {...field}
                    />
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
                    <Input
                      placeholder="password"
                      className="w-56 sm:w-96"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:flex flex-row gap-7">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="firstname"
                      className="w-56 sm:w-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="secondname"
                      className="w-56 sm:w-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="id@gmail.com"
                      type="email"
                      className="w-56 sm:w-72"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:flex flex-row gap-7">
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="77xxxxxx9"
                      className="w-56 sm:w-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Address"
                      className="w-56 sm:w-96"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="city"
                      className="w-56 sm:w-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:flex flex-row gap-7">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="state"
                      className="w-56 sm:w-64"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="country"
                      className="w-56 sm:w-60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip-Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="619-xxx"
                      className="w-56 sm:w-60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sm:flex flex-row gap-7">
            <div className="w-56 sm:w-96">
              <FormField
                control={form.control}
                name="teamname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>teamname</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Your Team Name" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">Unsigned</SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-56 sm:w-96">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Your Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="3">Team Member</SelectItem>
                        <SelectItem value="2">Team Lead</SelectItem>
                        <SelectItem value="1">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-56 sm:w-full">
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="skill1,skill2,skill3"
                      className="w-56 sm:w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-56 sm:w-full bg-purple-800 text-white"
          >
            Submit
          </Button>
        </form>
      </Form>
      <div className="flex flex-row text-xs font-normal gap-2 text-gray-500"><div>Already have an account</div><a href="/login" className="font-medium text-orange-800">Log In</a></div>
    </div>
  );
};

export default Register;
