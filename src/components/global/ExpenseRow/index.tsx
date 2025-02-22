import { Expense } from "@/api/types";
import { Link } from "react-router";
import { TableCell, TableRow } from "@/components/ui/table";

const ExpenseRow = ({ expense }: { expense: Expense }) => {
  return (
    <TableRow>
      <TableCell>{expense.expense_category.name}</TableCell>
      <TableCell>{expense.amount}</TableCell>
      <TableCell>{expense.expense_date}</TableCell>
      <TableCell>{expense.expense_period}</TableCell>
    </TableRow>
  );
};

export default ExpenseRow;
