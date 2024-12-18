// components/Login.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@/contexts/authContext";
import { login as serviceLogin } from "@/services/auth";
import { User } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type LoginFormInputs = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login: localLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<undefined | string>(undefined);

  const mutation = useMutation({
    mutationFn: serviceLogin,
    onSuccess: (data: User) => {
      localLogin(data);
      console.log(data);
      navigate("/dashboard", { replace: true });
    },
    onError: (err: Error) => {
      console.log(err?.status);
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setError(() => undefined);
    mutation.mutate(data);
  };

  return (
    <main className="h-screen w-full flex p-4 items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:max-w-xl w-full shadow-lg border rounded p-4"
      >
        <h3 className="text-xl text-center font-bold mb-4">
          <Link to="/">IGLUI PARK</Link>
        </h3>
        <div>
          <Label htmlFor="username" className="text-muted-foreground">
            Username
          </Label>
          <Input
            className="mt-2 mb-4"
            id="username"
            placeholder="Eg. Luigi Dapo"
            {...register("username", { required: true })}
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-muted-foreground">
            Password
          </Label>
          <Input
            className="mt-2 mb-4"
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
          <p className="text-destructive mt-2">
            Error: {mutation.error?.status}
          </p>
        )}
      </form>
    </main>
  );
};

export default Login;
