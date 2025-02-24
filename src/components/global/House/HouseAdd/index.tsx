import { useState } from "react";
import { postHouse } from "@/api/main";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { AxiosError } from "axios";

const HouseAdd = ({
  setLoading,
}: {
  setLoading: (loading: boolean) => void;
}) => {
  const [houseNumber, setHouseNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHouseNumber(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await postHouse(houseNumber, "vacant");
      setHouseNumber("");
      setIsOpen(false);
      setLoading(true);
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
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className={buttonVariants({ variant: "outline" })}>
          Tambah Rumah
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Tambah Rumah</DialogTitle>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label htmlFor="houseNumber">Nomor Rumah</label>
            <Input
              name="houseNumber"
              placeholder="RUM-99"
              value={houseNumber}
              onChange={handleInputChange}
            />
            <Button type="submit" variant="outline">
              Tambah Rumah
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HouseAdd;
