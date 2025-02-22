import { useState } from "react";
import axios from "axios";

const Uploads = () => {
  const [file, setFile] = useState<File | null>(null);

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://127.0.0.1:8000/upload/", formData);
    alert("File uploaded successfully!");
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default Uploads;
