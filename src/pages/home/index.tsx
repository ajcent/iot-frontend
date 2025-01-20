import { CarFront, Container } from "lucide-react";

import SearchSection from "./sections/_search";
import LoginHeaderAvatar from "@/components/loginHeaderAvatar";
import SearchingHuman from "@/components/svg/searchingHuman";
import ParkingLot from "@/components/parkingLot";

function Home() {
  return (
    <div className="p-4 sm:px-20 pt-0">
      <nav className="flex justify-between items-center py-4 pb-8">
        <h1 className="uppercase font-bold text-xl flex items-center gap-2">
          <Container size={40} />
          Gilui Park
        </h1>
        <LoginHeaderAvatar />
      </nav>
      <div className="flex flex-wrap flex-col gap-6 md:flex-row-reverse items-center justify-center">
        <div className="m-auto w-10/12 sm:max-w-96">
          <SearchingHuman />
        </div>
        <div className="w-full max-w-96">
          <SearchSection />
        </div>
      </div>
      <section className="flex flex-col gap-4 pt-8">
        <h3 className="font-bold text-base flex items-center gap-1">
          <CarFront />
          Park Management
        </h3>
        <div className="flex items-center justify-center">
          <ParkingLot />
        </div>
      </section>
    </div>
  );
}

export default Home;
