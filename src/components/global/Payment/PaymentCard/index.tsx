import { PaymentSummary } from "@/api/types";
import PaymentTable from "./PaymentTable";
import { formatCurrency } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PaymentCard = ({ summary }: { summary: PaymentSummary }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h2 className="font-semibold text-lg">
            Pembayaran, {summary.date}
          </h2>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="space-y-3">
            <h3>
              Total Nilai Pembayaran Lunas:{" "}
              <span className="font-semibold">
                {formatCurrency(summary.payment_total_paid)}
              </span>
            </h3>
            <h3>
              Total Nilai Pembayaran Belum Lunas:{" "}
              <span className="font-semibold">
                {formatCurrency(summary.payment_total_unpaid)}
              </span>
            </h3>
          </div>
          <PaymentTable payments={summary.payments} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PaymentCard;
