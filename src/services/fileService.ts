import api from "./api";

export const fetchFiles = async () => {
  try {
    const res = await api.get("/files"); // Removed trailing "/"
    // console.log(res.data);
    return res.data.files; // Ensure we return only the list of files
  } catch {
    throw new Error("Error fetching files.");
  }
};

export const uploadFile = async (file: File) => {
  if (!file) {
    throw new Error("File is required.");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data; // Return response in case UI needs to update
  } catch {
    throw new Error("Error uploading file.");
  }
};

export const deleteFile = async (id: number) => {
  try {
    const res = await api.delete(`/files/${id}`);
    return res.data; // Return response for confirmation
  } catch {
    throw new Error("Error deleting file.");
  }
};
