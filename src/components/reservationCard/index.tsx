import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface ReservationCardProps {
  slot: string | number;
  isOccupied: boolean;
}

const ReservationCard: React.FC<ReservationCardProps> = (props) => {
  const { slot, isOccupied } = props;

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{`Park ${slot}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {isOccupied ? "Occupied" : "Unoccupied"}
        </p>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
