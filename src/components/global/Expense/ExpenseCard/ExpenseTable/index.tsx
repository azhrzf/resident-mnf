import { Expense } from "@/api/types";
import ExpenseRow from "./ExpenseRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ExpenseTable = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <Table>
      <TableCaption>Tabel Pengeluaran.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Pengeluaran</TableHead>
          <TableHead>Jumlah</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Tipe</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense, index) => (
          <ExpenseRow key={expense.id} expense={expense} index={index} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ExpenseTable;
