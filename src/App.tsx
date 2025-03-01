import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Blogs from "./pages/Blogs";
import { isAuthenticated } from "./services/authService";

function PrivateRoute({ children }: { children: React.ReactElement }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blogs" element={<Blogs />} />
                </Routes>
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
