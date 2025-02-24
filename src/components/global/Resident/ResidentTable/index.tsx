import { ResidentWithLatestHouse } from "@/api/types";
import ResidentRow from "./ResidentRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ResidentTable = ({
  residents,
}: {
  residents: ResidentWithLatestHouse[];
}) => {
  return (
    <Table>
      <TableCaption>Tabel Penghuni.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Nama Lengkap</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tanggal Masuk</TableHead>
          <TableHead>Tanggal Keluar</TableHead>
          <TableHead>Rumah</TableHead>
          <TableHead>Nomor Telp</TableHead>
          <TableHead>Status Pernikahan</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {residents.map((resident, index) => (
          <ResidentRow key={resident.id} resident={resident} index={index} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ResidentTable;
