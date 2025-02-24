import { useState, useEffect } from "react";
import { getPayments } from "@/api/main";
import { PaymentSummary } from "@/api/types";
import { getMonthRange } from "@/lib/utils";
import { format } from "date-fns";
import PaymentChart from "@/components/global/Payment/PaymentChart";
import PaymentCard from "@/components/global/Payment/PaymentCard";
import InputSelect from "@/components/global/Input/InputSelect";
import InputDate from "@/components/global/Input/InputDate";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";

const PaymentsPage = () => {
  const [filterData, setFilterData] = useState({
    startDate: "",
    endDate: "",
    type: "",
  });

  const [payments, setPayments] = useState<PaymentSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDateChange = (date: Date | undefined, dateName: string) => {
    if (date) {
      const newDate = format(date, "yyyy-MM-dd");
      setFilterData((prevState) => ({ ...prevState, [dateName]: newDate }));
    }
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentsData = await getPayments();
        setPayments(paymentsData);
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

    fetchPayments();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const convertData = getMonthRange(
        filterData.startDate,
        filterData.endDate
      );
      const paymentData = await getPayments(convertData, filterData.type);
      setPayments(paymentData);
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
      <PageTitle title="Pembayaran" />
      {loading && <LoadingSpin />}
      {!loading && (
        <div className="space-y-4">
          <Link
            to="/add-payment"
            className={buttonVariants({ variant: "outline" })}
          >
            Tambah Pembayaran Baru
          </Link>
          <PaymentChart paymentSummary={payments} />
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
            {payments.map((payment, index) => (
              <PaymentCard key={index} summary={payment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
