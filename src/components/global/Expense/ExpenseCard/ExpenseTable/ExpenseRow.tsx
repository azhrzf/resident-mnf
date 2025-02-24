import { Expense } from "@/api/types";
import { formatCurrency } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";

const ExpenseRow = ({
  expense,
  index,
}: {
  expense: Expense;
  index: number;
}) => {

  const expensePeriod = expense.expense_period === "monthly" ? "Bulanan" : "Tidak Tentu";

  return (
    <TableRow>
      <TableCell>{index + 1}.</TableCell>
      <TableCell>{expense.expense_category.name}</TableCell>
      <TableCell>{formatCurrency(expense.amount)}</TableCell>
      <TableCell>{expense.expense_date}</TableCell>
      <TableCell>{expensePeriod}</TableCell>
    </TableRow>
  );
};

export default ExpenseRow;
