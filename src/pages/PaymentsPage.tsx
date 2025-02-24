import { useState, useEffect } from "react";
import { getPayments } from "@/api/main";
import { PaymentSummary } from "@/api/types";
import PaymentChart from "@/components/global/Payment/PaymentChart";
import PaymentCard from "@/components/global/Payment/PaymentCard";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";

const PaymentsPage = () => {
  const [payments, setPayments] = useState<PaymentSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPayments();
        setPayments(data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="space-y-5">
      <PageTitle title="Pembayaran" />
      {loading && <LoadingSpin />}
      {!loading && (
        <div className="space-y-4">
          <PaymentChart paymentSummary={payments} />
          <div>
            {payments.map((payment, index) => (
              <PaymentCard key={index} summary={payment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
