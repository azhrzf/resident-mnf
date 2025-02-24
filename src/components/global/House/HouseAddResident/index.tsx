import { useState } from "react";
import { putResident } from "@/api/main";
import { Resident } from "@/api/types";
import { format } from "date-fns";
import { Button, buttonVariants } from "@/components/ui/button";
import InputSelect from "@/components/global/Input/InputSelect";
import InputDate from "../../Input/InputDate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { AxiosError } from "axios";

const HouseAddResident = ({
  houseId,
  residents,
  setLoading,
}: {
  houseId: string;
  residents: Resident[];
  setLoading: (loading: boolean) => void;
}) => {
  const [residentId, setResidentId] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);

  const residentsOptions = residents.map((resident) => ({
    label: resident.full_name,
    value: String(resident.id),
  }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const selectedResident = residents.find(
        (resident) => resident.id === residentId
      );

      if (!selectedResident) {
        throw new Error("Resident not found");
      }

      const dataSelectedResident = {
        fullName: selectedResident.full_name,
        residentStatus: selectedResident.resident_status,
        phoneNumber: selectedResident.phone_number,
        maritalStatus: selectedResident.marital_status,
        houseId: houseId,
        dateOfEntry: dateData.dateOfEntry,
        dateOfExit: dateData.dateOfExit,
      };

      const response = await putResident(
        dataSelectedResident,
        String(selectedResident.id)
      );
      setIsOpen(false);
      if (response.status === "success") {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Failed to add house:", error);
      setIsOpen(false);
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

  const [dateData, setDateData] = useState({
    dateOfEntry: "",
    dateOfExit: "",
  });

  const handleDateChange = (date: Date | undefined, dateName: string) => {
    if (date) {
      const newDate = format(date, "yyyy-MM-dd");
      const updatedData = { ...dateData, [dateName]: newDate };

      if (
        new Date(updatedData.dateOfExit) < new Date(updatedData.dateOfEntry)
      ) {
        toast.error(
          "Tanggal keluar tidak boleh lebih kecil dari tanggal masuk"
        );
      } else {
        setDateData(updatedData);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className={buttonVariants({ variant: "outline" })}>
          Tambah Penghuni Rumah
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Tambah Penghuni Rumah</DialogTitle>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputSelect
              inputValue={String(residentId)}
              inputName="residentId"
              labelName="Penghuni"
              handleInputTextChange={(value) => setResidentId(Number(value))}
              selectValue={residentsOptions}
              required={true}
            />
            <p className="text-muted-foreground text-sm">
              *Menambahkan penghuni yang masih terikat dengan rumah lain, akan
              mengakhiri tanggal huni rumah sebelumnya.
            </p>
            <InputDate
              date={dateData.dateOfEntry}
              dateName="dateOfEntry"
              labelName="Tanggal Masuk"
              handleDateChange={handleDateChange}
              required={true}
            />
            <InputDate
              date={dateData.dateOfExit}
              dateName="dateOfExit"
              labelName="Tanggal Keluar"
              handleDateChange={handleDateChange}
              required={false}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setDateData((prevState) => ({ ...prevState, dateOfExit: "" }))
              }
            >
              Masih Tinggal Sampai Sekarang
            </Button>
            <Button type="submit" variant="outline" className="block">
              Tambah Penghuni Rumah
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HouseAddResident;
