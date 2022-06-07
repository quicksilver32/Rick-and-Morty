import React from "react";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import "../../assets/styles/components/pagination.css";

const Pagination = ({ updateSearchProps, currPage, setPage, prev, next }) => {
  const handleClick = (event) => {
    if (event.target.classList.contains("pagination__button-next")) {
      updateSearchProps("page", currPage + 1);
      setPage(currPage + 1);
    }
    if (event.target.classList.contains("pagination__button-prev")) {
      updateSearchProps("page", currPage - 1);
      setPage(currPage - 1);
    }
  };

  return (
    <div className="pagination">
      {prev !== null && (
        <button
          type="button"
          className="pagination__button pagination__button-prev"
          onClick={handleClick}
        >
          <NavigateBefore />
          Prev. page
        </button>
      )}
      {next !== null && (
        <button
          type="button"
          className="pagination__button pagination__button-next"
          onClick={handleClick}
        >
          Next page
          <NavigateNext />
        </button>
      )}
    </div>
  );
};

export default Pagination;
