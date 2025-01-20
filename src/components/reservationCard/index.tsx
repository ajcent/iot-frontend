import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, OctagonX } from "lucide-react";
import React from "react";

interface ReservationCardProps {
  slot: string | number;
  isOccupied: boolean;
}

const ReservationCard: React.FC<ReservationCardProps> = (props) => {
  const { slot, isOccupied } = props;

  return (
    <Card className="shadow-none w-1/6 aspect-9/16 bg-muted border-none">
      <CardHeader className="flex flex-col h-full gap-2 items-center justify-center space-y-0 pb-2">
        {/* <CardTitle>{`Park ${slot}`}</CardTitle> */}
        <CardTitle>{`${slot}`}</CardTitle>
        {isOccupied ? (
          <OctagonX className="text-red-400" />
        ) : (
          <CircleCheck className="text-green-400" />
        )}
      </CardHeader>
    </Card>
  );
};

export default ReservationCard;
