import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { getExpenseCategories, postExpense } from "@/api/main";
import { AxiosError } from "axios";
import { SelectInput, ExpenseCateogry } from "@/api/types";
import InputNumber from "@/components/global/Input/InputNumber";
import InputSelect from "@/components/global/Input/InputSelect";
import InputDate from "@/components/global/Input/InputDate";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AddExpensePage = () => {
  const [data, setData] = useState({
    expenseCategoryId: "",
    amount: 0,
    expenseDate: "",
    expensePeriod: "",
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

  const [expenseCategories, setExpenseCategories] = useState<SelectInput[]>([]);
  const [expenseCategoryHandler, setExpenseCategoryHandler] = useState<
    ExpenseCateogry[]
  >([]);
  const [expenseCategoryLoading, setHouseLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const matchExpenseCategory = expenseCategoryHandler.find(
      (expenseCategory) => Number(expenseCategory.id) === Number(data.expenseCategoryId)
    );
    if (matchExpenseCategory) {
      setData((prevState) => ({
        ...prevState,
       amount: matchExpenseCategory.default_amount,
      }));
    }
  }, [data.expenseCategoryId, expenseCategoryHandler]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const data = await getExpenseCategories();
        setExpenseCategories(
          data.map((expenseCategory) => {
            return {
              label: expenseCategory.name,
              value: expenseCategory.id.toString(),
            };
          })
        );
        setExpenseCategoryHandler(data);
      } catch (error) {
        console.error("Failed to fetch expenseCategories:", error);
      } finally {
        setHouseLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setPostLoading(true);

      const response = await postExpense(data);
      console.log(response);
      if (response.status === "success") {
        toast.success(response.message);
        navigate("expenses");
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
        {expenseCategoryLoading ? (
          <LoadingSpin />
        ) : (
          <InputSelect
            inputValue={data.expenseCategoryId}
            inputName="expenseCategoryId"
            labelName="Kategori Pengeluaran"
            handleInputTextChange={(value) =>
              setData((prevState) => ({
                ...prevState,
                expenseCategoryId: value,
              }))
            }
            selectValue={expenseCategories}
            required={true}
          />
        )}
        <InputSelect
          inputValue={data.expensePeriod}
          inputName="expensePeriod"
          labelName="Periode Pengeluaran"
          handleInputTextChange={(value) =>
            setData((prevState) => ({
              ...prevState,
              expensePeriod: value,
            }))
          }
          selectValue={[
            { label: "Bulanan", value: "monthly" },
            { label: "Tidak Tentu", value: "irregular" },
          ]}
          required={true}
        />
        <InputNumber
          inputValue={data.amount}
          inputName="amount"
          labelName="Jumlah"
          handleInputTextChange={handleInputTextChange}
          required={true}
        />
        <InputDate
          date={data.expenseDate}
          dateName="expenseDate"
          labelName="Tanggal Pengeluaran"
          handleDateChange={handleDateChange}
          required={true}
        />
        {postLoading ? (
          <LoadingSpin />
        ) : (
          <Button type="submit" variant="outline">
            Tambah Pengeluaran
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddExpensePage;
