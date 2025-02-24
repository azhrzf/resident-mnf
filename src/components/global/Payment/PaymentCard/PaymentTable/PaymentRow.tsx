import { useState } from "react";
import { patchPaymentPaid } from "@/api/main";
import { MultiPayment } from "@/api/types";
import { Link } from "react-router";
import { formatCurrency } from "@/lib/utils";
import LoadingSpin from "@/components/global/LoadingSpin";
import { TableCell, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { AxiosError } from "axios";

const PaymentRow = ({
  payment,
  index,
}: {
  payment: MultiPayment;
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

  return (
    <TableRow>
      <TableCell>{index + 1}.</TableCell>
      <TableCell>{payment.fee_type.name}</TableCell>
      <TableCell>
        <Link
          to={`/houses/${payment.house_resident.house.id}`}
          className="link-hover"
        >
          {payment.house_resident.house.house_number}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          to={`/residents/${payment.house_resident.resident.id}`}
          className="link-hover"
        >
          {payment.house_resident.resident.full_name}
        </Link>
      </TableCell>
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
