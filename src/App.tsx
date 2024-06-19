import React, { useState, ChangeEvent } from "react";

function App() {
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);

  const handleImageChange = (
    event: React.DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const files =
      event.type === "drop"
        ? (event as React.DragEvent<HTMLDivElement>).dataTransfer?.files
        : (event as ChangeEvent<HTMLInputElement>).target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setImagesSrc((prev) => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // 防止瀏覽器預設處理拖曳行為
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // 防止瀏覽器預設處理拖曳行為
    handleImageChange(event);
  };

  return (
    <>
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {imagesSrc.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Uploaded ${index}`}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
