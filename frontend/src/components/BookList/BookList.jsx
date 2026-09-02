import React from "react";
import { useNavigate } from "react-router-dom";

const BookList = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <h5>
        This will show the list of books that are currently added to the
        bookshelf.
      </h5>
      <br />
      <div>
        {props.list_of_books.map(function (el, index) {
          const handleOnClick = () => {
            navigate(`/search/${el.title}`, {
              state: { el },
            });
          };
          return (
            <div key={index}>
              <div onClick={() => handleOnClick(el)}>{el.title}</div>
              <div>{el.author}</div>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookList;
