import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PostUID, postUID } from "@/services/uid";

const AddUserDialog = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostUID>();

  const mutation = useMutation({
    mutationFn: postUID,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uids"] });
      reset();
    },
  });

  const onSubmit = (data: PostUID) => {
    mutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Information</DialogTitle>
          <DialogDescription>
            Insert new user here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="eg. igluigi"
              className="col-span-3"
              {...register("name", { required: "Username is required" })}
            />
            {errors.name && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              type="number"
              id="amount"
              placeholder="eg. 0"
              className="col-span-3"
              {...register("amount", {
                required: "Amount is required",
                valueAsNumber: true,
              })}
            />
            {errors.amount && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.amount.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uid" className="text-right">
              UID
            </Label>
            <Input
              id="uid"
              placeholder="eg. xxx-yyy-zzz"
              className="col-span-3"
              {...register("plate_number", { required: "UID is required" })}
            />
            {errors.plate_number && (
              <p className="col-span-4 text-red-500 text-sm">
                {errors.plate_number.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Adding.." : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
