import React from "react";
import BookList from "../BookList/BookList";

const Bookshelf = ({ bookshelf }) => {
  console.log("Bookshelf:", bookshelf);
  const splitDateCreated = bookshelf.el.date_created.split("T");
  const splitDateUpdated = bookshelf.el.date_updated.split("T");

  // console.log(splitDateCreated[0]);
  // console.log(splitDateUpdated[0]);

  return (
    <div>
      <div>
        <h4>{bookshelf.el.name}</h4>
        <div>
          <span>
            <label>Created On: </label>
            {splitDateCreated[0]}
            <br />
            {splitDateCreated[1]}
          </span>
          <br />
          <br />
          <span>
            <label>Last Updated On:</label>
            {splitDateUpdated[0]}
            <br />
            {splitDateUpdated[1]}
          </span>
          <br />
          <br />
          <span>
            <label>Description: </label>
            {bookshelf.el.description}
          </span>
        </div>
        <br />
        <div>
          <label>List of Books</label>
          <BookList list_of_books={bookshelf.el.list_of_books} />
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
