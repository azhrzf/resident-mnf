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
      <TableCaption>Tabel Pembayaran.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Tipe</TableHead>
          <TableHead>Nomor Rumah</TableHead>
          <TableHead>Nama Pembayar</TableHead>
          <TableHead>Jumlah</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Periode</TableHead>
          <TableHead>Status</TableHead>
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

export default PaymentTable;
