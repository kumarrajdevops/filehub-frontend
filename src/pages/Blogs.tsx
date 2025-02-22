import { useEffect, useState } from "react";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/blogs/");
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const addBlog = async () => {
    await axios.post("http://127.0.0.1:8000/blogs/", { title, content });
    fetchBlogs();
  };

  return (
    <div>
      <h2>Blogs</h2>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={addBlog}>Add Blog</button>
      <ul>
        {blogs.map((blog) => (
          <li key={(blog as { id: number }).id}>
            {(blog as { title: string }).title}:{" "}
            {(blog as { content: string }).content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
