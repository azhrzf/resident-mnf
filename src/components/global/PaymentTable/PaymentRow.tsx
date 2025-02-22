import { MultiPayment } from "@/api/types";
import { Link } from "react-router";
import { TableCell, TableRow } from "@/components/ui/table";

const PaymentRow = ({ payment }: { payment: MultiPayment }) => {
  return (
    <TableRow>
      <TableCell>{payment.fee_type.name}</TableCell>
      <TableCell>{payment.house_resident.house.house_number}</TableCell>
      <TableCell>{payment.house_resident.resident.full_name}</TableCell>
      <TableCell>{payment.amount}</TableCell>
      <TableCell>{payment.payment_date}</TableCell>
      <TableCell>{payment.payment_period}</TableCell>
      <TableCell>{payment.payment_status}</TableCell>
    </TableRow>
  );
};

export default PaymentRow;
