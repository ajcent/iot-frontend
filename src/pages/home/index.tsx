import { useQuery } from "@tanstack/react-query";
import { CarFront } from "lucide-react";

import { fetchReservations } from "@/services/reservation";
import ReservationCard from "@/components/reservationCard";

import SearchSection from "./sections/_search";
import LoginHeaderAvatar from "@/components/loginHeaderAvatar";

function Home() {
  const { data } = useQuery({
    queryKey: ["reservations"],
    queryFn: fetchReservations,
  });

  const reservations = data?.data;

  return (
    <div className="p-4 pt-0">
      <nav className="flex justify-between items-center py-4">
        <h1 className="uppercase font-bold text-xl">Iglui Park</h1>
        <LoginHeaderAvatar />
      </nav>
      <SearchSection />
      <section className="flex flex-col gap-4">
        <h3 className="font-bold text-base flex items-center gap-1">
          <CarFront />
          Park Management
        </h3>
        {reservations?.map(({ slot, id, is_occupied }) => (
          <ReservationCard key={id} slot={slot} isOccupied={is_occupied} />
        ))}
      </section>
    </div>
  );
}

export default Home;
