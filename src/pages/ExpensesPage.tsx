import { useState, useEffect } from "react";
import { getExpenses } from "@/api/main";
import { Expense } from "@/api/types";
import ExpenseRow from "@/components/global/ExpenseRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h1>expenses Page</h1>
      {loading && <p>Loading expenses...</p>}
      {!loading && (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Status Penghuni</TableHead>
              <TableHead>Nomor Penghuni</TableHead>
              <TableHead>Status Pernikahan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <ExpenseRow key={expense.id} expense={expense} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ExpensesPage;
