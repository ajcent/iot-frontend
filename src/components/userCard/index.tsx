import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import { deleteUID } from "@/services/uid";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserCardProps {
  title: string;
  id: string;
  content: string;
  plateNumber: string;
}

const UserCard: React.FC<UserCardProps> = (props) => {
  const { title, id, content, plateNumber } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteUID,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uids"] });
    },
  });

  const handleClick = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <Card className="shadow-none overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Button variant="secondary" size="icon" onClick={() => handleClick(id)}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{`PHP ${content}`}</p>
      </CardContent>
      <div className="flex bg-muted">
        <span className="m-auto py-1">{plateNumber}</span>
      </div>
    </Card>
  );
};

export default UserCard;
