import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";

function LoginHeaderAvatar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="rounded-full p-0"
      onClick={handleClick}
    >
      <CircleUserRound />
    </Button>
  );
}

export default LoginHeaderAvatar;
