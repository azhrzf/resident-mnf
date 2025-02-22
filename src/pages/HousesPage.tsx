import { useState, useEffect } from "react";
import { getHouses } from "@/api/main";
import { House } from "@/api/types";
import HouseCard from "@/components/global/HouseCard";

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
  }, []);

  return (
    <div>
      <h1>Houses Page</h1>
      {loading && <p>Loading expenses...</p>}
      {!loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {houses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HousesPage;
