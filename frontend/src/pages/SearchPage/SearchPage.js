import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const API_URL = "http://127.0.0.1:8000/api/bookshelves/";
const OPEN_LIBRARY_URL = "https://openlibrary.org/search.json";
// TODO #1: Search Open Library
// TODO #2: Display result cards
const SearchPage = () => {
  const [, token] = useAuth();
  const [bookshelves, setBookshelves] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setBookshelves(response.data);
        if (response.data.length) setSelectedShelf(String(response.data[0].id));
      })
      .catch(() => setStatusMessage("Could not load your bookshelves."));
  }, [token]);

  async function searchBooks(event) {
    event.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setStatusMessage("");
    try {
      const response = await axios.get(OPEN_LIBRARY_URL, {
        params: {
          q: query,
          limit: 12,
          fields: "key,title,author_name,cover_i,first_publish_year",
        },
      });
      setResults(response.data.docs);
      if (!response.data.docs.length) setStatusMessage("No books found.");
    } catch {
      setStatusMessage("Open Library could not be reached. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function saveBook(book) {
    if (!selectedShelf) return;
    const author = book.author_name?.[0] || "Unknown author";
    try {
      await axios.post(
        `${API_URL}${selectedShelf}/books/`,
        { title: book.title, author, book_info: book },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setStatusMessage(`Saved “${book.title}” to your shelf.`);
    } catch {
      setStatusMessage("That book could not be saved.");
    }
  }

  return (
    <main className="search-page">
      <h1>Find your next book</h1>
      <form className="book-search" onSubmit={searchBooks}>
        <input
          aria-label="Search books"
          placeholder="Search by title or author"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      <label className="shelf-picker">
        Save to
        <select
          value={selectedShelf}
          onChange={(event) => setSelectedShelf(event.target.value)}
        >
          {bookshelves.map((shelf) => (
            <option key={shelf.id} value={shelf.id}>
              {shelf.name}
            </option>
          ))}
        </select>
      </label>
      {statusMessage && <p role="status">{statusMessage}</p>}
      <section className="book-results" aria-live="polite">
        {results.map((book) => (
          <article className="book-result" key={book.key}>
            <Link to={`/book/${book.key}`}>
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt=""
                />
              ) : (
                <div className="cover-placeholder">No cover</div>
              )}
              <div>
                <h2>{book.title}</h2>
                <p>{book.author_name?.[0] || "Unknown author"}</p>
                {book.first_publish_year && (
                  <small>First published {book.first_publish_year}</small>
                )}
                <button
                  type="button"
                  onClick={() => saveBook(book)}
                  disabled={!selectedShelf}
                >
                  Add to shelf
                </button>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
};

export default SearchPage;
