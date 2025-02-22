import { MultiPayment } from "@/api/types";
import PaymentRow from "./PaymentRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PaymentTable = ({ payments }: { payments: MultiPayment[] }) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Tipe Pembayaran</TableHead>
          <TableHead>Nomor Rumah</TableHead>
          <TableHead>Nama Pembayar</TableHead>
          <TableHead>Jumlah Pembayaran</TableHead>
          <TableHead>Tanggal Pembayaran</TableHead>
          <TableHead>Periode Pembayaran</TableHead>
          <TableHead>Status Pembayaran</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <PaymentRow key={payment.id} payment={payment} />
        ))}
      </TableBody>
    </Table>
  );
};

export default PaymentTable;
