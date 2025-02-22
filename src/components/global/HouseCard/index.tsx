import { House } from "@/api/types";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";

const HouseCard = ({ house }: { house: House }) => {
  const occupancyStatus =
    house.occupancy_status === "occupied" ? "Dihuni" : "Tidak Dihuni";

  return (
    <Card className="p-4 space-y-2">
      <Link className="link-hover" to={`/houses/${house.id}`}>
        <h2>{house.house_number}</h2>
      </Link>
      <p>{occupancyStatus}</p>
    </Card>
  );
};

export default HouseCard;
