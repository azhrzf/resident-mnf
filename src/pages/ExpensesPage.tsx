import { useState, useEffect } from "react";
import { getExpenses } from "@/api/main";
import { getMonthRange } from "@/lib/utils";
import { format } from "date-fns";
import { ExpenseSummary } from "@/api/types";
import ExpenseChart from "@/components/global/Expense/ExpenseChart";
import ExpenseCard from "@/components/global/Expense/ExpenseCard";
import InputSelect from "@/components/global/Input/InputSelect";
import InputDate from "@/components/global/Input/InputDate";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";
import { buttonVariants, Button } from "@/components/ui/button";
import { Link } from "react-router";
import { toast } from "sonner";
import { AxiosError } from "axios";

const ExpensesPage = () => {
  const [filterData, setFilterData] = useState({
    startDate: "",
    endDate: "",
    type: "",
  });

  const [expensess, setExpenses] = useState<ExpenseSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDateChange = (date: Date | undefined, dateName: string) => {
    if (date) {
      const newDate = format(date, "yyyy-MM-dd");
      setFilterData((prevState) => ({ ...prevState, [dateName]: newDate }));
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expensesData = await getExpenses();
        setExpenses(expensesData);
      } catch (error) {
        console.error("Failed to fetch expensess:", error);
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

    fetchExpenses();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const convertData = getMonthRange(
        filterData.startDate,
        filterData.endDate
      );
      const paymentData = await getExpenses(convertData, filterData.type);
      setExpenses(paymentData);
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
      <PageTitle title="Pengeluaran" />
      {loading && <LoadingSpin />}
      {!loading && (
        <div className="space-y-4">
          <Link
            to="/add-expense"
            className={buttonVariants({ variant: "outline" })}
          >
            Tambah Pengeluaran Baru
          </Link>
          <ExpenseChart expenseSummary={expensess} />
          <p>Filter Berdasarkan Range Tanggal</p>
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
          <div>
            {expensess.map((expenses, index) => (
              <ExpenseCard key={index} summary={expenses} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
