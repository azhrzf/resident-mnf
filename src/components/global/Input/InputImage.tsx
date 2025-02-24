import { backendUrl } from "@/api/main";
import { Button } from "@/components/ui/button";

interface InputImageProps {
  imageSrc: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: () => void;
  labelName: string;
  loading?: boolean;
}

const InputImage = ({
  imageSrc,
  fileInputRef,
  handleFileInputChange,
  handleButtonClick,
  labelName,
  loading = false,
}: InputImageProps) => {
  const setImageSrc = () => {
    if (!imageSrc) {
      return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    } else if (imageSrc.startsWith("blob")) {
      return imageSrc;
    }
    return `${backendUrl}/api/images/residents/${imageSrc}`;
  };

  return (
    <div className="space-y-3">
      <label htmlFor="image">{labelName}</label>
      <div className="flex space-x-3">
        <img
          src={setImageSrc()}
          alt="user"
          className="rounded-lg max-w-96 max-h-48"
        />
        <div>
          <input
            type="file"
            accept="image/*"
            name="image"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileInputChange}
            disabled={loading}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleButtonClick}
            disabled={loading}
            type="button"
          >
            Ganti Gambar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputImage;
