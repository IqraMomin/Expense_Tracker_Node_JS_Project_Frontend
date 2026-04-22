const Pagination = ({
    currentPage,
    isNextPage,
    isPreviousPage,
    nextPage,
    previousPage,
    onPageChange,
  }) => {
    return (
      <div>
        <button
          disabled={!isPreviousPage}
          onClick={() => onPageChange(previousPage)}
        >
          Prev
        </button>
  
        <span> Page {currentPage} </span>
  
        <button
          disabled={!isNextPage}
          onClick={() => onPageChange(nextPage)}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;