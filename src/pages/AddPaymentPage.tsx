import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { getFeeTypes, getHouseResidents, postPayment } from "@/api/main";
import { AxiosError } from "axios";
import { SelectInput, FeeType } from "@/api/types";
import InputNumber from "@/components/global/Input/InputNumber";
import InputSelect from "@/components/global/Input/InputSelect";
import InputDate from "@/components/global/Input/InputDate";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AddPaymentPage = () => {
  const [data, setData] = useState({
    houseResidentId: "",
    feeTypeId: "",
    amount: 0,
    paymentDate: "",
    paymentPeriod: "",
    paymentStatus: "",
  });

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (date: Date | undefined, dateName: string) => {
    if (date) {
      const newDate = format(date, "yyyy-MM-dd");
      setData((prevState) => ({ ...prevState, [dateName]: newDate }));
    }
  };

  const [houseResidents, setHouseResidents] = useState<SelectInput[]>([]);
  const [feeTypes, setFeeTypes] = useState<SelectInput[]>([]);
  const [feeTypeHandler, setFeeTypeHandler] = useState<FeeType[]>([]);
  const [feeTypeLoading, setFeeTypeLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const matchFeeType = feeTypeHandler.find(
      (expenseCategory) => Number(expenseCategory.id) === Number(data.feeTypeId)
    );
    if (matchFeeType) {
      setData((prevState) => ({
        ...prevState,
        amount: matchFeeType.default_amount,
      }));
    }
  }, [data.feeTypeId, feeTypeHandler]);

  useEffect(() => {
    const fetchHouseResident = async () => {
      try {
        const data = await getHouseResidents();
        setHouseResidents(
          data.map((houseResident) => {
            return {
              label: `${houseResident.resident.full_name} - ${houseResident.house.house_number}`,
              value: houseResident.id.toString(),
            };
          })
        );
      } catch (error) {
        console.error("Failed to fetch feeTypes:", error);
        if (error instanceof AxiosError && error.response) {
          toast.error(error.response.data.message);
        } else {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        }
      }
    };

    const fetchFeeTypes = async () => {
      try {
        const data = await getFeeTypes();
        setFeeTypes(
          data.map((feeType) => {
            return {
              label: feeType.name,
              value: feeType.id.toString(),
            };
          })
        );
        setFeeTypeHandler(data);
      } catch (error) {
        console.error("Failed to fetch feeTypes:", error);
        if (error instanceof AxiosError && error.response) {
          toast.error(error.response.data.message);
        } else {
          if (error instanceof Error) {
            toast.error(error.message);
          }
        }
      }
    };

    fetchFeeTypes();
    fetchHouseResident();
    setFeeTypeLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setPostLoading(true);

      const response = await postPayment(data);
      if (response.status === "success") {
        toast.success(response.message);
        navigate("/payments");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Failed to post resident:", error);

      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <PageTitle title="Ubah Penghuni" />
      <form className="space-y-5" onSubmit={handleSubmit}>
        {feeTypeLoading ? (
          <LoadingSpin />
        ) : (
          <div className="space-y-5">
            <InputSelect
              inputValue={data.houseResidentId}
              inputName="houseResidentId"
              labelName="Penghuni Rumah - Nomor Rumah"
              handleInputTextChange={(value) =>
                setData((prevState) => ({
                  ...prevState,
                  houseResidentId: value,
                }))
              }
              selectValue={houseResidents}
              required={true}
            />
            <InputSelect
              inputValue={data.feeTypeId}
              inputName="feeTypeId"
              labelName="Kategori Pembayaran"
              handleInputTextChange={(value) =>
                setData((prevState) => ({
                  ...prevState,
                  feeTypeId: value,
                }))
              }
              selectValue={feeTypes}
              required={true}
            />
          </div>
        )}
        <InputNumber
          inputValue={data.amount}
          inputName="amount"
          labelName="Jumlah"
          handleInputTextChange={handleInputTextChange}
          required={true}
          disabled={true}
        />
        <InputDate
          date={data.paymentDate}
          dateName="paymentDate"
          labelName="Tanggal Pembayaran"
          handleDateChange={handleDateChange}
          required={true}
        />
        <InputSelect
          inputValue={data.paymentPeriod}
          inputName="paymentPeriod"
          labelName="Periode Pembayaran"
          handleInputTextChange={(value) =>
            setData((prevState) => ({
              ...prevState,
              paymentPeriod: value,
            }))
          }
          selectValue={[
            { label: "Bulanan", value: "monthly" },
            { label: "Tahunan", value: "yearly" },
          ]}
          required={true}
        />
        <InputSelect
          inputValue={data.paymentStatus}
          inputName="paymentStatus"
          labelName="Status Pembayaran"
          handleInputTextChange={(value) =>
            setData((prevState) => ({
              ...prevState,
              paymentStatus: value,
            }))
          }
          selectValue={[
            { label: "Lunas", value: "paid" },
            { label: "Belum Lunas", value: "unpaid" },
          ]}
          required={true}
        />
        {postLoading ? (
          <LoadingSpin />
        ) : (
          <Button type="submit" variant="outline">
            Tambah Pembayaran
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddPaymentPage;
