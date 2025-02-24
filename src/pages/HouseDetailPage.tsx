import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getHouseDetail, getResidents } from "@/api/main";
import { HouseExtendsHouseResident, Resident } from "@/api/types";
import HouseDetailCard from "@/components/global/House/HouseDetail/HouseDetailCard";
import HouseAddResident from "@/components/global/House/HouseAddResident";
import NotFound from "@/components/global/NotFound";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";
import { toast } from "sonner";
import { AxiosError } from "axios";

const HouseDetailPage = () => {
  const { id } = useParams();

  const [house, setHouse] = useState<HouseExtendsHouseResident>();
  const [residents, setResidents] = useState<Resident[]>([]);

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const data = await getHouseDetail(id || "");
        setHouse(data);
      } catch (error) {
        console.error("Failed to fetch houses:", error);
        if (error instanceof AxiosError && error.response) {
          toast.error(error.response.data.message);
        } else {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        }
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, [id, loading]);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const data = await getResidents();
        setResidents(data);
      } catch (error) {
        console.error("Failed to fetch residents:", error);
        if (error instanceof AxiosError && error.response) {
          toast.error(error.response.data.message);
        } else {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        }
      }
    };

    fetchResidents();
  }, []);

  const occupancyStatus =
    house?.occupancy_status === "occupied" ? "Dihuni" : "Tidak Dihuni";

  return (
    <div className="space-y-5">
      <PageTitle title="Rumah" />
      {loading && <LoadingSpin />}
      {!loading && notFound && <NotFound />}
      {!loading && !notFound && (
        <div className="space-y-5">
          <p>
            Nomor Rumah:{" "}
            <span className="font-semibold">
              {house?.house_number}-{house?.id}
            </span>
          </p>
          <p>
            Status Huni:{" "}
            <span className="font-semibold">{occupancyStatus}</span>
          </p>
          <HouseAddResident
            houseId={id || ""}
            residents={residents}
            setLoading={setLoading}
          />
        </div>
      )}
      {!loading &&
        house?.house_residents.map((houseResident, index) => (
          <HouseDetailCard key={index} houseResident={houseResident} />
        ))}
    </div>
  );
};

export default HouseDetailPage;
