import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

// import components
import BookshelfForm from "../../components/BookshelfForm/BookshelfForm";
import BookshelfList from "../../components/BookshelfList/BookshelfList";

const BookshelfListPage = () => {
  const [user, token] = useAuth();
  const [bookshelves, setBookshelves] = useState([]);

  const fetchUserShelvesList = useCallback(() => {
    try {
      axios
        .get("http://127.0.0.1:8000/api/bookshelves/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(
            `The response was found for ${user}! Showing the bookshelves! ` +
              Object.values(
                response.data.map(function (el) {
                  return el.name;
                })
              )
          );
          setBookshelves(response.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  }, [token, user]);

  useEffect(() => {
    fetchUserShelvesList();
  }, [fetchUserShelvesList]);

  return (
    <div>
      <div>
        <BookshelfList bookshelves={bookshelves} />
        <br />
      </div>
      <div>
        <BookshelfForm />
      </div>
    </div>
  );
};

export default BookshelfListPage;
