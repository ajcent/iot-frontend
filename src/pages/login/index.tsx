// components/Login.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@/contexts/authContext";
import { login as serviceLogin } from "@/services/auth";
import { User } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginFormInputs = {
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
    mutation.mutate();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:bg-red-400 sm:max-w-xl m-4"
    >
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          className="mt-2 mb-4"
          id="username"
          placeholder="Eg. Luigi Dapo"
          {...register("username", { required: true })}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
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
      {mutation.isError && <p>Error: {mutation.error?.message}</p>}
    </form>
  );
};

export default Login;
