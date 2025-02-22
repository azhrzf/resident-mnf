import { useState, useEffect } from "react";
import { getPayments } from "@/api/main";
import { MultiPayment } from "@/api/types";
import PaymentTable from "@/components/global/PaymentTable";

const PaymentsPage = () => {
  const [payments, setPayments] = useState<MultiPayment[]>([]);
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
    <div>
      <h1>payments Page</h1>
      {loading && <p>Loading expenses...</p>}
      {!loading && <PaymentTable payments={payments} />}
    </div>
  );
};

export default PaymentsPage;
