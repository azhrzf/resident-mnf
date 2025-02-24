import { useState, useEffect } from "react";
import { getHouses } from "@/api/main";
import { House } from "@/api/types";
import HouseCard from "@/components/global/House/HouseCard";
import HouseAdd from "@/components/global/House/HouseAdd";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";

const HousesPage = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const data = await getHouses();
        setHouses(data);
      } catch (error) {
        console.error("Failed to fetch houses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, [loading]);

  return (
    <div className="space-y-5">
      <PageTitle title="Rumah" />
      <HouseAdd setLoading={setLoading} />
      {loading && <LoadingSpin />}
      {!loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {houses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HousesPage;
