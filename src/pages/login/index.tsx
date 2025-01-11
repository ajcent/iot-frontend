import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@/contexts/authContext";
import { login as serviceLogin } from "@/services/auth";
import { User } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "lucide-react";

export type LoginFormInputs = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login: localLogin } = useAuth();
  const navigate = useNavigate();
  // const [error, setError] = useState<undefined | string>(undefined);

  const mutation = useMutation({
    mutationFn: serviceLogin,
    onSuccess: (data: User) => {
      localLogin(data);
      navigate("/dashboard", { replace: true });
    },
    // onError: (err: Error) => {
    //   console.log(err?.status);
    // },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    // setError(() => undefined);
    mutation.mutate(data);
  };

  return (
    <main className="h-screen w-full flex p-4 items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:max-w-lg w-full shadow-lg px-4 py-8 sm:px-8 sm:py-16 rounded-xl"
      >
        <h3 className="text-xl text-center font-bold mb-8">
          <Link to="/" className="flex gap-2 place-items-center justify-center">
            <Container size={40} />
            GILUI PARK
          </Link>
        </h3>

        <div className="mb-4">
          <Label htmlFor="username" className="text-muted-foreground">
            Username
          </Label>
          <Input
            className="mt-1 bg-muted border-none"
            id="username"
            placeholder="Eg. Luigi Dapo"
            {...register("username", { required: true })}
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="password" className="text-muted-foreground">
            Password
          </Label>
          <Input
            className="mt-1 bg-muted border-none"
            id="password"
            type="password"
            placeholder="********"
            {...register("password", { required: true })}
          />
        </div>
        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {mutation.isPending ? "Logging in..." : "Login"}
        </Button>
        {mutation.isError && (
          <p className="text-destructive mt-2">Invalid crendentials</p>
        )}
      </form>
    </main>
  );
};

export default Login;
