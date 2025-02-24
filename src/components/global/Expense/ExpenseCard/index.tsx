import { ExpenseSummary } from "@/api/types";
import ExpenseTable from "./ExpenseTable";
import { formatCurrency } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ExpenseCard = ({ summary }: { summary: ExpenseSummary }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h2 className="font-semibold text-lg">
            Pengeluaran, {summary.month}/{summary.year}
          </h2>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="space-y-3">
            <h3>
              Total Nilai Pengeluaran:{" "}
              <span className="font-semibold">
                {formatCurrency(summary.expense_total)}
              </span>
            </h3>
          </div>
          <ExpenseTable expenses={summary.expenses} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ExpenseCard;
