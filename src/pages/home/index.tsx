import { useQuery } from "@tanstack/react-query";

import { fetchReservations } from "@/services/reservation";
import ReservationCard from "@/components/reservationCard";

function Home() {
  const { data } = useQuery({
    queryKey: ["reservations"],
    queryFn: fetchReservations,
  });

  const reservations = data?.data;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center pb-4">
        <h3 className="font-bold text-base">Park Management</h3>
      </div>
      <div className="flex flex-col gap-4">
        {reservations?.map(({ slot, id, is_occupied }) => (
          <ReservationCard key={id} slot={slot} isOccupied={is_occupied} />
        ))}
      </div>
    </div>
  );
}

export default Home;
