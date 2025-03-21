import api from "./api";

export const fetchFiles = async () => {
  try {
    const res = await api.get("/files");
    return res.data?.files ?? []; // Ensure we return an array to avoid UI crashes
  } catch (error) {
    console.error("Error fetching files:", error);
    throw new Error("Failed to retrieve files. Please try again.");
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
    return res.data; // Ensure response is returned in case UI needs it
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("File upload failed. Please try again.");
  }
};

export const deleteFile = async (id: number) => {
  try {
    const res = await api.delete(`/files/${id}`);
    return res.data; // Return response for UI updates
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("File deletion failed. Please try again.");
  }
};

// Fetch a Presigned URL for secure file access
export const getPresignedUrl = async (fileId: number) => {
  try {
    const res = await api.get(`/files/${fileId}/presigned`);
    if (res.data?.presigned_url) {
      return res.data.presigned_url; // Return the URL to open/download the file
    } else {
      throw new Error("Presigned URL not found.");
    }
  } catch (error) {
    console.error("Error fetching presigned URL:", error);
    throw new Error("Could not generate a secure download link.");
  }
};
