import api from "./api";

export const fetchBlogs = async () => {
  try {
    const res = await api.get("/blogs/");
    return res.data;
  } catch {
    throw new Error("Error fetching blogs.");
  }
};

export const addBlog = async (title: string, content: string) => {
  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  try {
    await api.post("/blogs/", { title, content });
  } catch {
    throw new Error("Error adding blog.");
  }
};

export const deleteBlog = async (id: number) => {
  try {
    await api.delete(`/blogs/${id}/`);
  } catch {
    throw new Error("Error deleting blog.");
  }
};
