import { useState } from "react";

const FileUpload = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const backgroundImageStyle = image
    ? {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        width: "112px",
        height: "112px",
      }
    : {};

  return (
    <>
      <div className="flex justify-end w-[90%]">
        <label
          className="rounded-lg w-28 h-28 flex flex-col justify-center items-center gap-1 overflow-hidden bg-slate-900"
          htmlFor="fileInput"
          style={backgroundImageStyle}
        >
          <input
            id="fileInput"
            type="file"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <span className="text-center rounded-full bg-blue-700 w-6 h-6">
            +
          </span>
        </label>
      </div>
    </>
  );
};
export default FileUpload;
