import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import { deleteUID } from "@/services/uid";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserCardProps {
  title: string;
  id: string;
  content: string;
}

const UserCard: React.FC<UserCardProps> = (props) => {
  const { title, id, content } = props;
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
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => handleClick(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
};

export default UserCard;
