import { Button } from "react-bootstrap";

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

      <Button className="me-2"
        variant="btn btn-outline-secondary"
        disabled={!isPreviousPage}
        onClick={() => onPageChange(previousPage)}
      >
        Prev
      </Button>

      <span><strong>Page {currentPage}</strong>  </span>

      <Button className="ms-2"
        variant="btn btn-outline-secondary"
        disabled={!isNextPage}
        onClick={() => onPageChange(nextPage)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;