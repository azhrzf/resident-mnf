import { ResidentWithLatestHouse } from "@/api/types";
import { Link } from "react-router";
import { TableCell, TableRow } from "@/components/ui/table";

const ResidentRow = ({ resident }: { resident: ResidentWithLatestHouse }) => {
  return (
    <TableRow>
      <TableCell>{resident.full_name}</TableCell>
      <TableCell>{resident.resident_status}</TableCell>
      <TableCell>{resident.house_residents[0].house.house_number}</TableCell>
      <TableCell>{resident.phone_number}</TableCell>
      <TableCell>{resident.marital_status}</TableCell>
    </TableRow>
  );
};

export default ResidentRow;
