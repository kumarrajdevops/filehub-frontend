import { useEffect, useState, useRef } from "react";
import { isAuthenticated } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { uploadFile, fetchFiles, deleteFile } from "../services/fileService";


interface FileItem {
  id: number;
  name: string;
  url: string;
}

const UploadFiles = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else {
      loadFiles();
    }
  }, [navigate]);

  useEffect(() => {
    let timer: number;
    if (error) {
      timer = setTimeout(() => setError(null), 5000); //5sec error message
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [error]);

  const loadFiles = async () => {
    try {
      const data = await fetchFiles();
      setFiles(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while fetching files"
      );
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }
    try {
      await uploadFile(selectedFile);
      setSelectedFile(null);
      loadFiles();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while uploading the file"
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFile(id);
      setFiles((prev) => prev.filter((file) => file.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred while deleting the file"
      );
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Upload Files
          </h2>
          
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Manage your files with ease. Upload and delete files securely.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Your Files</h2>

          {files.length > 0 ? (
            <ul className="mt-4">
              {files.map((file) => (
                <li key={file.id} className="flex justify-between items-center p-2 border-b">
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {file.name}
                  </a>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No files uploaded yet.</p>
          )}
        </div>

        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Upload a File</h2>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default UploadFiles;
