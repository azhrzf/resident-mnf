import { useState } from "react";
import { useNavigate } from "react-router";
import { putHouse } from "@/api/main";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import InputSelect from "../../Input/InputSelect";
import { AxiosError } from "axios";

interface HouseEditProps {
  data: {
    id: string;
    house_number: string;
    occupancy_status: string;
  };
}

const HouseEdit = ({ data }: HouseEditProps) => {
  const [house, setHouse] = useState({
    houseNumber: data.house_number,
    occupancyStatus: data.occupancy_status,
  });

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await putHouse(
        data.id,
        house.houseNumber,
        house.occupancyStatus
      );
      setHouse({
        houseNumber: "",
        occupancyStatus: "vacant",
      });
      setIsOpen(false);
      if (response.status === "success") {
        toast.success(response.message);
        navigate(`/houses/${data.id}`);
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
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <p className="link-hover text-sm">Ubah Rumah</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Ubah Rumah</DialogTitle>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label htmlFor="houseNumber">Nomor Rumah</label>
            <Input
              name="houseNumber"
              placeholder="RUM-99"
              value={house.houseNumber}
              onChange={(event) =>
                setHouse((prevState) => ({
                  ...prevState,
                  houseNumber: event.target.value,
                }))
              }
            />
            <InputSelect
              labelName="Status Rumah"
              inputName="occupancyStatus"
              inputValue={house.occupancyStatus}
              handleInputTextChange={(value) =>
                setHouse((prevState) => ({
                  ...prevState,
                  occupancyStatus: value,
                }))
              }
              selectValue={[
                { label: "Dihuni", value: "occupied" },
                { label: "Tidak Dihuni", value: "vacant" },
              ]}
            />
            <p className="text-muted-foreground">
              *Mengatur Rumah ke Tidak Duhuni berarti menyelesaikan kontrak
              semua penghuni
            </p>
            <Button type="submit" variant="outline">
              Ubah Rumah
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HouseEdit;
