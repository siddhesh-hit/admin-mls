import React, { useState, useEffect } from "react";
import ShowingEntries from "../../table/ShowingEntries";

const Paginate = ({ totalCount, perPage, handlePageChange, initialPage }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const numberOfPages = Math.round(totalCount / perPage);
  const pageToShow = 5;
  const displayPage = [];

  const countPagesToShow = () => {
    if (numberOfPages <= pageToShow) {
      // Show all pages if total pages are less than or equal to the display limit
      for (let i = 1; i <= numberOfPages; i++) {
        displayPage.push(i);
      }
    } else {
      const lastPage = numberOfPages;

      if (currentPage <= pageToShow / 2 + 1) {
        // Show first few pages and ellipses
        for (let i = 1; i <= pageToShow; i++) {
          displayPage.push(i);
        }
        displayPage.push("...");
        displayPage.push(lastPage - 1);
      } else if (currentPage >= numberOfPages - pageToShow / 2) {
        // Show last few pages and ellipses
        displayPage.push(1); // Show the first page
        displayPage.push("...");
        for (
          let i = Math.max(lastPage - pageToShow + 1, 2);
          i <= lastPage - 1;
          i++
        ) {
          displayPage.push(i);
        }
      } else {
        displayPage.push(1); // Show the first page
        displayPage.push("...");
        for (
          let i = Math.max(currentPage - Math.floor(pageToShow / 2), 2);
          i <= Math.min(currentPage + Math.floor(pageToShow / 2), lastPage - 1);
          i++
        ) {
          displayPage.push(i);
        }
        displayPage.push("...");
        displayPage.push(lastPage - 1); // Show the last page
      }
    }
    return displayPage;
  };

  useEffect(() => {
    // Call `handlePageChange` to update data fetching/display logic when the page changes
    handlePageChange(currentPage);
  }, [currentPage]);

  const handleClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= numberOfPages) {
      setCurrentPage(page);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    console.log(currentPage, numberOfPages);
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageLinks = () => {
    return countPagesToShow().map((page, index) => (
      <span
        className={`${page === currentPage ? "active" : "inactive"}`}
        key={index}
        onClick={() => handleClick(page)}
      >
        {page}
      </span>
    ));
  };

  console.log(initialPage)

  return (

    <div className="paginationcss">
      <ShowingEntries start={(initialPage - 1) * 10 + 1} end={(initialPage * perPage)} total={totalCount} />

      <div className="paginationnew">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          «
        </button>
        {renderPageLinks()}
        <button
          onClick={goToNextPage}
          disabled={currentPage === numberOfPages - 1}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Paginate;
