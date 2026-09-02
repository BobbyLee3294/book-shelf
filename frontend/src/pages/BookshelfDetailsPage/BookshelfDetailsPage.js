import React from "react";
import { useLocation } from "react-router-dom";
import Bookshelf from "../../components/Bookshelf/Bookshelf";

const BookshelfDetailsPage = () => {
  // TODO: figure out a way to pass bookshelf data from BookshelfListPage to here
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
