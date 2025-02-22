import { Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1>Welcome to File & Blog Manager</h1>
      <nav>
        <Link to="/login">Login</Link> |<Link to="/blogs">Blogs</Link> |
        <Link to="/uploads">File Uploads</Link>
      </nav>
    </div>
  );
};

export default App;
