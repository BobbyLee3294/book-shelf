// General Imports
import { Route, Routes } from "react-router-dom";
import "./App.css";

// Pages Imports
import BookshelfDetailsPage from "./pages/BookshelfDetailsPage/BookshelfDetailsPage";
import BookshelfListPage from "./pages/BookshelfListPage/BookshelfListPage";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SearchPage from "./pages/SearchPage/SearchPage";

// Component Imports
import Footer from "./components/Footer/Footer";
import Navbar from "./components/NavBar/NavBar";
import RouteFocus from "./components/RouteFocus/RouteFocus";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header>
        <Navbar />
      </header>
      <main id="main-content" tabIndex="-1">
        <RouteFocus />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookshelf_list"
            element={
              <PrivateRoute>
                <BookshelfListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookshelf_details/:bookshelf"
            element={
              <PrivateRoute>
                <BookshelfDetailsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
