import { HouseResidentInResident } from "@/api/types";
import { formatCurrency } from "@/lib/utils";
import ResidentPaymentTable from "./ResidentPaymentTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ResidentDetailCard = ({
  houseResident,
}: {
  houseResident: HouseResidentInResident;
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

  const houseStatus =
    houseResident.house.occupancy_status === "occupied"
      ? "Dihuni"
      : "Tidak Dihuni";

  const stillOccupied = houseResident.date_of_exit === null ? "Masih Tinggal" : houseResident.date_of_exit;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h2 className="font-semibold text-lg">
            Data Pembayaran pada Rumah: {houseResident.house.house_number} (
            {houseStatus}) - {houseResident.date_of_entry} s/d {stillOccupied}
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
          <ResidentPaymentTable payments={houseResident.payments} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ResidentDetailCard;
