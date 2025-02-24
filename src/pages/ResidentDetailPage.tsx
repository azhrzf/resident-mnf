import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { backendUrl, getResidentDetail } from "@/api/main";
import { ResidentExtendsHouseResident } from "@/api/types";
import ResidentDetailCard from "@/components/global/Resident/ResidentDetail/ResidentDetailCard";
import NotFound from "@/components/global/NotFound";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { AxiosError } from "axios";

const ResidentDetailPage = () => {
  const { id } = useParams();

  const [resident, setResident] = useState<ResidentExtendsHouseResident>();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const data = await getResidentDetail(id || "");
        setResident(data);
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

    fetchResidents();
  }, [id]);

  const residentStatus =
    resident?.resident_status === "permanent" ? "Tetap" : "Kontrak";

  const maritalStatus =
    resident?.marital_status === "married" ? "Sudah Menikah" : "Belum Menikah";

  return (
    <div className="space-y-5">
      <PageTitle title={resident?.full_name || ""} />
      {loading && <LoadingSpin />}
      {!loading && notFound && <NotFound />}
      {!loading && !notFound && (
        <div className="space-y-5">
          <Link
            to={`/edit-resident/${id}`}
            className={buttonVariants({ variant: "outline" })}
          >
            Ubah Data Penghuni
          </Link>
          <p>
            Noma Lengkap:{" "}
            <span className="font-semibold">{resident?.full_name}</span>
          </p>
          <p>
            Status Penghuni:{" "}
            <span className="font-semibold">{residentStatus}</span>
          </p>
          <p>
            Nomor HP:{" "}
            <span className="font-semibold">{resident?.phone_number}</span>
          </p>
          <p>
            Status Pernikahan:{" "}
            <span className="font-semibold">{maritalStatus}</span>
          </p>
          <p>Foto KTP: </p>
          <img
            src={`${backendUrl}/api/images/residents/${resident?.id_card_photo}`}
            alt="KTP"
            className="w-96"
          />
        </div>
      )}
      {!loading &&
        resident?.house_residents.map((houseResident, index) => (
          <ResidentDetailCard key={index} houseResident={houseResident} />
        ))}
    </div>
  );
};

export default ResidentDetailPage;
