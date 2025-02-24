import { useState, useEffect } from "react";
import { getAllSummary } from "@/api/main";
import { AllSummary } from "@/api/types";
import { getMonthRange } from "@/lib/utils";
import { format } from "date-fns";
import SummaryChart from "@/components/global/Summary/SummaryChart";
import PaymentCard from "@/components/global/Payment/PaymentCard";
import ExpenseCard from "@/components/global/Expense/ExpenseCard";
import InputDate from "@/components/global/Input/InputDate";
import InputSelect from "@/components/global/Input/InputSelect";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AxiosError } from "axios";

const ReportSummaryPage = () => {
  const [filterData, setFilterData] = useState({
    startDate: "",
    endDate: "",
    type: "",
  });

  const [summary, setSummary] = useState<AllSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDateChange = (date: Date | undefined, dateName: string) => {
    if (date) {
      const newDate = format(date, "yyyy-MM-dd");
      setFilterData((prevState) => ({ ...prevState, [dateName]: newDate }));
    }
  };

  useEffect(() => {
    const fetchAllSummary = async () => {
      try {
        const data = await getAllSummary();

        setSummary(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
        if (error instanceof AxiosError && error.response) {
          toast.error(error.response.data.message);
        } else {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        }
      }
    };

    fetchAllSummary();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const convertData = getMonthRange(
        filterData.startDate,
        filterData.endDate
      );
      const paymentData = await getAllSummary(convertData, filterData.type);
      setSummary(paymentData);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
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
    <div className="space-y-5">
      <PageTitle title="Report Summary" />
      {loading && <LoadingSpin />}
      {!loading && (
        <div className="space-y-6">
          <SummaryChart summary={summary} />
          <form className="space-y-4 max-w-screen-sm" onSubmit={handleSubmit}>
            <InputDate
              date={filterData.startDate}
              dateName="startDate"
              labelName="Tanggal Mulai"
              handleDateChange={handleDateChange}
              required={true}
            />
            <InputDate
              date={filterData.endDate}
              dateName="endDate"
              labelName="Tanggal Selesai"
              handleDateChange={handleDateChange}
              required={true}
            />
            <InputSelect
              inputValue={filterData.type}
              inputName="type"
              labelName="Tipe Filter"
              handleInputTextChange={(value) =>
                setFilterData((prevState) => ({ ...prevState, type: value }))
              }
              selectValue={[
                { label: "Bulanan", value: "monthly" },
                { label: "Tahunan", value: "yearly" },
              ]}
              required={true}
            />
            <Button type="submit" variant="outline">
              Filter
            </Button>
          </form>
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
