import { useState } from "react";
import { patchPaymentPaid } from "@/api/main";
import { Payment } from "@/api/types";
import { formatCurrency } from "@/lib/utils";
import LoadingSpin from "@/components/global/LoadingSpin";
import { TableCell, TableRow } from "@/components/ui/table";

const PaymentRow = ({
  payment,
  index,
}: {
  payment: Payment;
  index: number;
}) => {
  const paymentPeriod =
    payment.payment_period === "monthly" ? "Bulanan" : "Tahunan";

  const [paymentStatus, setPaymentStatus] = useState(
    payment.payment_status === "paid" ? "Lunas" : "Belum Lunas"
  );

  const [loading, setLoading] = useState(false);

  const handlePaymentPaid = async () => {
    try {
      setLoading(true);
      const response = await patchPaymentPaid(String(payment.id));
      if (response.status === "success") {
        setPaymentStatus("Lunas");
      }
    } catch (error) {
      console.error("Error posting resident:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell>{index + 1}.</TableCell>
      <TableCell>{payment.fee_type.name}</TableCell>
      <TableCell>{formatCurrency(payment.amount)}</TableCell>
      <TableCell>{payment.payment_date}</TableCell>
      <TableCell>{paymentPeriod}</TableCell>
      <TableCell>{paymentStatus}</TableCell>
      <TableCell>
        {loading ? (
          <LoadingSpin />
        ) : paymentStatus === "Belum Lunas" ? (
          <button
            className="link-hover flex items-center"
            onClick={handlePaymentPaid}
          >
            Tambah Pelunasan
          </button>
        ) : (
          <p className="text-muted-foreground">Lunas</p>
        )}
      </TableCell>
    </TableRow>
  );
};

export default PaymentRow;
