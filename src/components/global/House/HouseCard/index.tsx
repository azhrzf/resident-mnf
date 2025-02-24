import { House } from "@/api/types";
import { Link } from "react-router";
import HouseEdit from "../HouseEdit";
import { Card } from "@/components/ui/card";

const HouseCard = ({ house }: { house: House }) => {
  const occupancyStatus =
    house.occupancy_status === "occupied" ? "Dihuni" : "Tidak Dihuni";

  const dataEdit = {
    id: house.id.toString(),
    house_number: house.house_number,
    occupancy_status: house.occupancy_status,
  };

  return (
    <Card className="p-4">
      <div className="space-y-2">
        <Link className="link-hover" to={`/houses/${house.id}`}>
          <h2 className="text-lg font-semibold">{house.house_number}</h2>
        </Link>
        <p>{occupancyStatus}</p>
        <HouseEdit data={dataEdit} />
      </div>
    </Card>
  );
};

export default HouseCard;
