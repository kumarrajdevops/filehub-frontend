import { useEffect, useState } from "react";
import { isAuthenticated } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { fetchBlogs, addBlog, deleteBlog } from "../services/blogService";

interface Blog {
  id: number;
  title: string;
  content: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login"); // Redirect if not logged in
    } else {
      loadBlogs();
    }
  }, [navigate]);

  const loadBlogs = async () => {
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching the blogs "
      );
    }
  };

  const handleAddBlog = async () => {
    try {
      await addBlog(title, content);
      setTitle("");
      setContent("");
      loadBlogs();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while adding the blog"
      );
    }
  };

  const handleDeleteBlog = async (id: number) => {
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting the blog"
      );
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Blog
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                <svg
                  className="mr-1 w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
                Tutorial
              </span>
              <span className="text-sm">14 days ago</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href="#">How to quickly deploy a static website</a>
            </h2>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
              Static websites are now used to bootstrap lots of websites and are
              becoming the basis for a variety of tools that even influence both
              web designers and developers influence both web designers and
              developers.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  className="w-7 h-7 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                  alt="Jese Leos avatar"
                />
                <span className="font-medium dark:text-white">Jese Leos</span>
              </div>
              <a
                href="#"
                className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
              >
                Read more
                <svg
                  className="ml-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </article>
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                <svg
                  className="mr-1 w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                    clip-rule="evenodd"
                  ></path>
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                </svg>
                Article
              </span>
              <span className="text-sm">14 days ago</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href="#">Our first project with React</a>
            </h2>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
              Static websites are now used to bootstrap lots of websites and are
              becoming the basis for a variety of tools that even influence both
              web designers and developers influence both web designers and
              developers.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  className="w-7 h-7 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                  alt="Bonnie Green avatar"
                />
                <span className="font-medium dark:text-white">
                  Bonnie Green
                </span>
              </div>
              <a
                href="#"
                className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
              >
                Read more
                <svg
                  className="ml-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </article>

          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-5 text-gray-500">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  <svg
                    className="mr-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      clip-rule="evenodd"
                    ></path>
                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                  </svg>
                  Article
                </span>
                <span className="text-sm">14 days ago</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">{blog.title}</a>
              </h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                {blog.content}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    className="w-7 h-7 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                    alt="Bonnie Green avatar"
                  />
                  <span className="font-medium dark:text-white">
                    Bonnie Green
                  </span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Read more
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="p-1 rounded-md bg-gray-100 text-gray-600 hover:bg-red-200 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-300"
                  aria-label="Delete Blog"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-2 14H7L5 6m5 0V4a2 2 0 012-2h2a2 2 0 012 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Blogs</h2>

        {error && <p className="text-red-500">{error}</p>}

        {/* Blog List */}
        <ul className="mt-4"></ul>

        {/* Blog Form */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={handleAddBlog}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Blog
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
