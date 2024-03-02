import React, { useState, useEffect } from "react";

const Paginate = ({ totalCount, perPage, handlePageChange, initialPage }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const numberOfPages = Math.floor(totalCount / perPage);
  const pageToShow = 5;
  const displayPage = [];

  const countPagesToShow = () => {
    if (numberOfPages <= pageToShow) {
      // Show all pages if total pages are less than or equal to the display limit
      for (let i = 0; i <= numberOfPages; i++) {
        displayPage.push(i);
      }
    } else {
      const lastPage = numberOfPages;

      if (currentPage <= pageToShow / 2 + 1) {
        // Show first few pages and ellipses
        for (let i = 0; i <= pageToShow; i++) {
          displayPage.push(i);
        }
        displayPage.push("...");
        displayPage.push(lastPage);
      } else if (currentPage >= numberOfPages - pageToShow / 2) {
        // Show last few pages and ellipses
        displayPage.push(0); // Show the first page
        displayPage.push("...");
        for (
          let i = Math.max(lastPage - pageToShow + 1, 2);
          i <= lastPage;
          i++
        ) {
          displayPage.push(i);
        }
      } else {
        displayPage.push(0); // Show the first page
        displayPage.push("...");
        for (
          let i = Math.max(currentPage - Math.floor(pageToShow / 2), 2);
          i <= Math.min(currentPage + Math.floor(pageToShow / 2), lastPage - 1);
          i++
        ) {
          displayPage.push(i);
        }
        displayPage.push("...");
        displayPage.push(lastPage); // Show the last page
      }
    }
    return displayPage;
  };

  useEffect(() => {
    handlePageChange(currentPage);
  }, [currentPage]);

  const handleClick = (page) => {
    console.log(numberOfPages, page);

    if (page >= 0 && page < numberOfPages + 1) {
      setCurrentPage(page);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numberOfPages - 1) {
      // Adjust condition

      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageLinks = () => {
    return countPagesToShow().map((page, index) => (
      <span
        key={index}
        style={{
          border: "1px solid black",
          padding: "5px",
          margin: "2px",
          cursor: page === currentPage ? "default" : "pointer",
          backgroundColor: page === currentPage ? "red" : "white",
        }}
        onClick={() => handleClick(page)}
      >
        {page === "..." ? page : page + 1}
      </span>
    ));
  };

  return (
    <div>
      <button onClick={goToPrevPage} disabled={currentPage === 0}>
        Prev
      </button>
      {renderPageLinks()}
      <button onClick={goToNextPage} disabled={currentPage === numberOfPages}>
        Next
      </button>
    </div>
  );
};

export default Paginate;
