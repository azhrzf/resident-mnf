import { HouseResidentInHouse } from "@/api/types";
import { formatCurrency } from "@/lib/utils";
import HousePaymentTable from "./HousePaymentTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HouseDetailCard = ({
  houseResident,
}: {
  houseResident: HouseResidentInHouse;
}) => {
  const totalPaid = houseResident.payments.reduce(
    (acc, payment) =>
      payment.payment_status === "paid"
        ? acc + Number(payment.amount)
        : acc + 0,
    0
  );

  const totalUnpaid = houseResident.payments.reduce(
    (acc, payment) =>
      payment.payment_status === "unpaid"
        ? acc + Number(payment.amount)
        : acc + 0,
    0
  );

  const residentStatus =
    houseResident.resident.resident_status === "permanent"
      ? "Tetap"
      : "Kontrak";

  const stillOccupied =
    houseResident.date_of_exit === null
      ? "Masih Tinggal"
      : houseResident.date_of_exit;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h2 className="font-semibold text-lg">
            Data Pembayaran dari: {houseResident.resident.full_name} (
            {residentStatus}) - {houseResident.date_of_entry} s/d{" "}
            {stillOccupied}
          </h2>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="space-y-3">
            <h3>
              Jumlah Pembayaran Lunas:{" "}
              <span className="font-semibold">{formatCurrency(totalPaid)}</span>
            </h3>
            <h3>
              Jumlah Pembayaran Belum Lunas:{" "}
              <span className="font-semibold">
                {formatCurrency(totalUnpaid)}
              </span>
            </h3>
          </div>
          <HousePaymentTable payments={houseResident.payments} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default HouseDetailCard;
