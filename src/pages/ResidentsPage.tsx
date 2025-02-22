import { useState, useEffect } from "react";
import { getResidents } from "@/api/main";
import { ResidentWithLatestHouse } from "@/api/types";
import ResidentRow from "@/components/global/ResidentRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  return (
    <div>
      <h1>residents Page</h1>
      {loading && <p>Loading expenses...</p>}
      {!loading && (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Status Penghuni</TableHead>
              <TableHead>Rumah Penghuni</TableHead>
              <TableHead>Nomor Telp Penghuni</TableHead>
              <TableHead>Status Pernikahan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {residents.map((resident) => (
              <ResidentRow key={resident.id} resident={resident} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ResidentsPage;
