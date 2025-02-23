import { useEffect, useState } from "react";
import axios from "axios";

// ✅ Load API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Blog {
  id: number;
  title: string;
  content: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/blogs/`);
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const addBlog = async () => {
    try {
      await axios.post(`${API_BASE_URL}/blogs/`, { title, content });
      fetchBlogs();
    } catch (error) {
      console.error("Error adding blog", error);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={addBlog}>Add Blog</button>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <strong>{blog.title}</strong>: {blog.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
