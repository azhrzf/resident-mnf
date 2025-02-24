import { useState, useEffect } from "react";
import { getExpenses } from "@/api/main";
import { ExpenseSummary } from "@/api/types";
import ExpenseChart from "@/components/global/Expense/ExpenseChart";
import ExpenseCard from "@/components/global/Expense/ExpenseCard";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";

const ExpensesPage = () => {
  const [expensess, setExpenses] = useState<ExpenseSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expensess:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

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
