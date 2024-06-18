import { useState, ChangeEvent } from "react";

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = (
    event: DragEvent | ChangeEvent<HTMLInputElement>
  ) => {
    const files =
      event.type === "drop"
        ? (event as DragEvent).dataTransfer?.files
        : (event as ChangeEvent<HTMLInputElement>).target.files;
    const file = files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault(); // 防止瀏覽器預設處理拖曳行為 (比如一些不希望的檔案拖放行為)
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault(); // 防止瀏覽器預設處理拖曳行為
    handleImageChange(event);
  };

  const Hello = (person: string) => {
    return "Hello, " + person;
  };
  const name = "123";
  console.log(Hello(name));

  return (
    <>
      <p className="text-red-500">Hello</p>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: "2px dashed gray",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        拖曳圖片到這裡或者點擊選擇檔案
      </div>
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded"
          style={{ maxWidth: "100%", maxHeight: "400px" }}
        />
      )}
    </>
  );
}

export default App;
