import { ResidentWithLatestHouse } from "@/api/types";
import { Link } from "react-router";
import { TableCell, TableRow } from "@/components/ui/table";

const ResidentRow = ({
  resident,
  index,
}: {
  resident: ResidentWithLatestHouse;
  index: number;
}) => {
  const residentStatus =
    resident.resident_status === "permanent" ? "Tetap" : "Kontrak";
  const maritalStatus =
    resident.marital_status === "married" ? "Sudah Menikah" : "Belum Menikah";

  const houseMap = resident.house_residents[0];

  return (
    <TableRow>
      <TableCell>{index + 1}.</TableCell>
      <TableCell>
        <Link to={`/residents/${resident.id}`} className="link-hover">
          {resident.full_name}
        </Link>
      </TableCell>
      <TableCell>{residentStatus}</TableCell>
      <TableCell>
        {houseMap ? houseMap.date_of_entry : "Belum Menghuni"}
      </TableCell>
      <TableCell>
        {houseMap ? houseMap.date_of_exit || "Masih Tinggal" : "Belum Menghuni"}
      </TableCell>
      <TableCell>
        <Link
          to={houseMap ? `/houses/${houseMap.house.id}` : "#"}
          className="link-hover"
        >
          {houseMap ? houseMap.house.house_number : "Belum Menghuni"}
        </Link>
      </TableCell>
      <TableCell>{resident.phone_number}</TableCell>
      <TableCell>{maritalStatus}</TableCell>
      <TableCell>
        <Link to={`/edit-resident/${resident.id}`} className="link-hover">
          {" "}
          Ubah
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default ResidentRow;
