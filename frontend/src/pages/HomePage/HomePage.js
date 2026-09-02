import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";
import { Link } from "react-router-dom";
// TODO: Add the following pages: 'Bookshelf', 'Search', 'Book', 'Book Info'
const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [quote, setQuote] = useState();

  useEffect(() => {
    fetchQuote();
    console.log("Fetching the user's info.");
  }, [token]);
  async function fetchQuote() {
    try {
      // debugger;
      const response = await axios.get("https:/quotes.rest/qod?language=en");
      console.log(response.data.contents.quotes[0].quote);
      setQuote(response.data.contents.quotes[0].quote);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      <div>
        <h3>Something to think about {user.first_name}</h3>
        <br />
        <p>{quote}</p>
      </div>
      <div>
        <Link to="/search">
          <button>Find books</button>
        </Link>
      </div>
      <div>
        <Link to="/bookshelf_list">
          <button>Bookshelves</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
