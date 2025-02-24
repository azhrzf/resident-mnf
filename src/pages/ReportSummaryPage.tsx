import { useState, useEffect } from "react";
import { getAllSummary } from "@/api/main";
import { AllSummary } from "@/api/types";
import SummaryChart from "@/components/global/Summary/SummaryChart";
import PaymentCard from "@/components/global/Payment/PaymentCard";
import ExpenseCard from "@/components/global/Expense/ExpenseCard";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";

const ReportSummaryPage = () => {
  const [summary, setSummary] = useState<AllSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllSummary = async () => {
      try {
        const data = await getAllSummary();

        setSummary(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      }
    };

    fetchAllSummary();
  }, []);

  return (
    <div className="space-y-5">
      <PageTitle title="Report Summary"/>
      {loading && <LoadingSpin />}
      {!loading && (
        <div className="space-y-6">
          <SummaryChart summary={summary} />
          {summary.map((item, index) => (
            <div key={index}>
              <PaymentCard summary={item} />
              <ExpenseCard summary={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportSummaryPage;
