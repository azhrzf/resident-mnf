import { Payment } from "@/api/types";
import PaymentRow from "./PaymentRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ResidentPaymentTable = ({ payments }: { payments: Payment[] }) => {
  return (
    <Table>
      <TableCaption>Tabel Pembayaran.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Tipe Pembayaran</TableHead>
          <TableHead>Jumlah Pembayaran</TableHead>
          <TableHead>Tanggal Pembayaran</TableHead>
          <TableHead>Periode Pembayaran</TableHead>
          <TableHead>Status Pembayaran</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment, index) => (
          <PaymentRow key={payment.id} payment={payment} index={index} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ResidentPaymentTable;
