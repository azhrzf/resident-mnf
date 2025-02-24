import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";
import { getResidentDetail, getHouses, putResident } from "@/api/main";
import { AxiosError } from "axios";
import { SelectInput } from "@/api/types";
import InputText from "@/components/global/Input/InputText";
import InputSelect from "@/components/global/Input/InputSelect";
import InputDate from "@/components/global/Input/InputDate";
import InputImage from "@/components/global/Input/InputImage";
import PageTitle from "@/components/global/PageTitle";
import LoadingSpin from "@/components/global/LoadingSpin";
import NotFound from "@/components/global/NotFound";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EditResidentPage = () => {
  const [data, setData] = useState({
    fullName: "",
    residentStatus: "",
    phoneNumber: "",
    maritalStatus: "",
    houseId: "",
    dateOfEntry: "",
    dateOfExit: "",
  });

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (date: Date | undefined, dateName: string) => {
    if (date) {
      const newDate = format(date, "yyyy-MM-dd");
      const updatedData = { ...data, [dateName]: newDate };

      if (
        new Date(updatedData.dateOfExit) < new Date(updatedData.dateOfEntry)
      ) {
        toast.error(
          "Tanggal keluar tidak boleh lebih kecil dari tanggal masuk"
        );
      } else {
        setData(updatedData);
      }
    }
  };

  console.log(data);

  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [houses, setHouses] = useState<SelectInput[]>([]);
  const [getLoading, setGetLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchResidentDetail = async () => {
      try {
        const data = await getResidentDetail(id || "");

        const houseResident = data.house_residents[0]

        setData((prevState) => ({
          ...prevState,
          fullName: data.full_name,
          residentStatus: data.resident_status,
          phoneNumber: data.phone_number,
          maritalStatus: data.marital_status,
          houseId: houseResident ? houseResident.house_id.toString() : "",
          dateOfEntry: houseResident ? houseResident.date_of_entry : "",
          dateOfExit: houseResident ? houseResident.date_of_exit || "" : "",
        }));
        setImageSrc(data.id_card_photo);
      } catch (error) {
        console.error("Failed to fetch residents:", error);
        setNotFound(true);
      }
    };

    const fetchHouses = async () => {
      try {
        const data = await getHouses();
        setHouses(
          data.map((house) => {
            return {
              label: house.house_number,
              value: house.id.toString(),
            };
          })
        );
      } catch (error) {
        console.error("Failed to fetch houses:", error);
      }
    };

    fetchHouses();
    fetchResidentDetail();
    setGetLoading(false);
  }, [id]);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      const file = files[0];
      setImageFile(file);
      const imagePath = URL.createObjectURL(file);
      setImageSrc(imagePath);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setPostLoading(true);

      const response = await putResident({ ...data, imageFile: imageFile || undefined }, id || "");

      if (response.status === "success") {
        toast.success(response.message);
        navigate(`/residents/${id}`);
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
      <PageTitle title="Tambah Penghuni" />
      {!getLoading && notFound && <NotFound />}
      {!getLoading && !notFound && (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <InputText
            inputValue={data.fullName}
            inputName="fullName"
            labelName="Nama Lengkap"
            handleInputTextChange={handleInputTextChange}
            required={true}
          />
          <InputSelect
            inputValue={data.maritalStatus}
            inputName="maritalStatus"
            labelName="Status Pernikahan"
            handleInputTextChange={(value) =>
              setData((prevState) => ({ ...prevState, maritalStatus: value }))
            }
            selectValue={[
              { label: "Sudah Menikah", value: "single" },
              { label: "Belum Menikah", value: "married" },
            ]}
            required={true}
          />
          <InputSelect
            inputValue={data.residentStatus}
            inputName="residentStatus"
            labelName="Status Penghuni"
            handleInputTextChange={(value) =>
              setData((prevState) => ({ ...prevState, residentStatus: value }))
            }
            selectValue={[
              { label: "Permeanen", value: "permanent" },
              { label: "Kontrak", value: "temporary" },
            ]}
            required={true}
          />
          <InputText
            inputValue={data.phoneNumber}
            inputName="phoneNumber"
            labelName="Nomor Telepon"
            handleInputTextChange={handleInputTextChange}
            required={true}
          />
          <InputDate
            date={data.dateOfEntry}
            dateName="dateOfEntry"
            labelName="Tanggal Masuk"
            handleDateChange={handleDateChange}
            required={true}
          />
          <InputDate
            date={data.dateOfExit}
            dateName="dateOfExit"
            labelName="Tanggal Keluar"
            handleDateChange={handleDateChange}
            required={false}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setData((prevState) => ({ ...prevState, dateOfExit: "" }))
            }
          >
            Masih Tinggal Sampai Sekarang
          </Button>
          <InputSelect
            inputValue={data.houseId}
            inputName="houseId"
            labelName="Rumah"
            handleInputTextChange={(value) =>
              setData((prevState) => ({ ...prevState, houseId: value }))
            }
            selectValue={houses}
            required={true}
          />
          <InputImage
            imageSrc={imageSrc}
            fileInputRef={fileInputRef}
            handleFileInputChange={handleFileInputChange}
            handleButtonClick={handleButtonClick}
            labelName="Foto KTP"
          />
          {postLoading ? (
            <LoadingSpin />
          ) : (
            <Button type="submit" variant="outline">
              Ubah Penghuni
            </Button>
          )}
        </form>
      )}
    </div>
  );
};

export default EditResidentPage;
