import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getResidents } from "@/api/main";
import { ResidentWithLatestHouse } from "@/api/types";
import ResidentTable from "@/components/global/Resident/ResidentTable";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { AxiosError } from "axios";

const ResidentsPage = () => {
  const [residents, setResidents] = useState<ResidentWithLatestHouse[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  return (
    <div className="space-y-5">
      <PageTitle title="Penghuni" />
      <Link to="/add-resident" className={buttonVariants({ variant: "outline" })}>Tambah Penghuni</Link>
      {loading && <LoadingSpin />}
      {!loading && <ResidentTable residents={residents} />}
    </div>
  );
};

export default ResidentsPage;
