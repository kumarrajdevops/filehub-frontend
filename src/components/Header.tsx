import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState, useEffect } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Update the document class when theme changes
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const handleLogout = () => {
    // Clear any authentication tokens/data from localStorage
    localStorage.removeItem("token");
    // Add any other cleanup needed

    // Redirect to login page
    navigate("/login");
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="https://flowbite.com" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <button
              onClick={handleLogout}
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Logout
            </button>
            <Link
              to="/signup"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Sign Up
            </Link>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className={`block py-2 pr-4 pl-3 ${
                    location.pathname === "/"
                      ? "text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-red-500"
                      : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700"
                  } lg:p-0 dark:text-gray-400 lg:dark:hover:text-white`}
                  aria-current={location.pathname === "/" ? "page" : undefined}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`block py-2 pr-4 pl-3 ${
                    location.pathname === "/about"
                      ? "text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-red-500"
                      : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700"
                  } lg:p-0 dark:text-gray-400 lg:dark:hover:text-white`}
                  aria-current={
                    location.pathname === "/about" ? "page" : undefined
                  }
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className={`block py-2 pr-4 pl-3 ${
                    location.pathname === "/portfolio"
                      ? "text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-red-500"
                      : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700"
                  } lg:p-0 dark:text-gray-400 lg:dark:hover:text-white`}
                  aria-current={
                    location.pathname === "/portfolio" ? "page" : undefined
                  }
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`block py-2 pr-4 pl-3 ${
                    location.pathname === "/contact"
                      ? "text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-red-500"
                      : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700"
                  } lg:p-0 dark:text-gray-400 lg:dark:hover:text-white`}
                  aria-current={
                    location.pathname === "/contact" ? "page" : undefined
                  }
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className={`block py-2 pr-4 pl-3 ${
                    location.pathname === "/blogs"
                      ? "text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-red-500"
                      : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700"
                  } lg:p-0 dark:text-gray-400 lg:dark:hover:text-white`}
                  aria-current={
                    location.pathname === "/blogs" ? "page" : undefined
                  }
                >
                  Blogs
                </Link>
              </li>
              <li>
                <button
                  onClick={toggleDarkMode}
                  type="button"
                  className="flex items-center w-9 h-9 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  {isDark ? (
                    <svg
                      data-toggle-icon="sun"
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
                    </svg>
                  ) : (
                    <svg
                      data-toggle-icon="moon"
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
                    </svg>
                  )}
                  <span className="sr-only">Toggle dark/light mode</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
