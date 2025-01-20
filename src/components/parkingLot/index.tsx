import { useQuery } from "@tanstack/react-query";

import { fetchReservations } from "@/services/reservation";
import ReservationCard from "../reservationCard";
import { Card, CardHeader, CardTitle } from "../ui/card";

function ParkingLot() {
  const { data } = useQuery({
    queryKey: ["reservations"],
    queryFn: fetchReservations,
  });

  const reservations = data?.data;

  const rowOne = reservations?.slice(0, 4);
  const rowTwo = reservations?.slice(4);

  return (
    <section className="flex flex-col max-w-xl w-full p-4 border border-double rounded-md shadow-lg">
      <div className="flex gap-4 flex-grow">
        {rowOne?.map(({ slot, id, is_occupied }) => (
          <ReservationCard key={id} slot={slot} isOccupied={is_occupied} />
        ))}
      </div>
      <div className="flex items-center justify-center aspect-5/2">
        <div className="w-1/2 aspect-7/1 bg-muted rounded-md" />
      </div>
      <div className="flex gap-4 flex-grow">
        <Entry />
        {rowTwo?.map(({ slot, id, is_occupied }) => (
          <ReservationCard key={id} slot={slot} isOccupied={is_occupied} />
        ))}
      </div>
    </section>
  );
}

const Entry = () => {
  return (
    <Card className="shadow-none w-1/2 mr-auto border-none bg-muted">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Here</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ParkingLot;
