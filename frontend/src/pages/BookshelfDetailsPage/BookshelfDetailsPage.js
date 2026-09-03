import React from "react";
import { useLocation } from "react-router-dom";
import Bookshelf from "../../components/Bookshelf/Bookshelf";

const BookshelfDetailsPage = () => {
  // TODO #1: Combine "Book" and "Book Info" pages
  // TODO #2: Display book title, author, and other info
  // TODO #3: Allow editing or removing books from the shelf
  // TODO #4: Use a route such as '/bookshelves/:bookshelfId'
  // TODO #5
  const { state } = useLocation();

  return (
    <div>
      <div>
        <div>
          <Bookshelf bookshelf={state} />
        </div>
      </div>
    </div>
  );
};

export default BookshelfDetailsPage;
