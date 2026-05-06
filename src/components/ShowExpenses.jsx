import React from "react";
import Pagination from "../components/Pagination";
import PageSizeSelector from "../components/PageSizeSelector";
import TableContent from "../components/UI/TableContent";
import { Button, Col, Row } from "react-bootstrap";
import { CSVLink } from "react-csv";

function ShowExpenses({
  list,
  currentPage,
  isNextPage,
  isPreviousPage,
  nextPage,
  previousPage,
  loading,
  error,
  expenseType,
  handlePageChange
}) {

  const headers = [
    { label: "ID", key: "id" },
    { label: "Date", key: "createdAt" },
    { label: "Amount", key: "amount" },
    { label: "Description", key: "description" }
  ]
  return (
    <Row>
      <Col xs={12} md={12} lg={12} style={{ height: "10vh" }}
        className="d-flex align-items-center justify-content-between">
        <h2>{expenseType}</h2>
        <PageSizeSelector />
      </Col>
      <Col xs={12} md={12} lg={12}>

        {/* Loading */}
        {loading && <p>Loading...</p>}

        {/* Error */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* No data */}
        {!loading && list?.length === 0 && (
          <p>No expenses found</p>
        )}


        <TableContent expenses={list} />
      </Col>

      <Row className="align-items-center">
        <Col md={7} className="text-end">
          <Pagination
            currentPage={currentPage}
            isNextPage={isNextPage}
            isPreviousPage={isPreviousPage}
            nextPage={nextPage}
            previousPage={previousPage}
            onPageChange={handlePageChange}
          />
        </Col>

        <Col md={5} className="text-end">
          <CSVLink data={list} headers={headers}>
            <Button variant="success">Download CSV</Button>
          </CSVLink>
        </Col>
      </Row>
    </Row>
  )
}

export default ShowExpenses;
