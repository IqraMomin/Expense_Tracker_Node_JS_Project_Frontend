import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import { fetchAllExpenses } from "../store/Slices/expenseSlice";
import PageSizeSelector from "./PageSizeSelector";

const AllExpensesPage = () => {
  const dispatch = useDispatch();


  const {
    list,
    currentPage,
    isNextPage,
    isPreviousPage,
    nextPage,
    previousPage,
    loading,
    error,
  } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(fetchAllExpenses(1));
  }, [dispatch]);


// this is your function 👇
const handlePageChange = (page) => {
  const limit = Number(localStorage.getItem("itemsPerPage")) || 2;

  dispatch(fetchAllExpenses({ page, limit }));
};

  return (
    <div>
       <PageSizeSelector/> 
       
      <h2>All Expenses</h2>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* No data */}
      {!loading && list?.length === 0 && (
        <p>No expenses found</p>
      )}

      {/* Expense List */}
      <ul>
        {list?.map((expense) => (
          <li key={expense.id}>
            ₹{expense.amount} —{" "}
            {new Date(expense.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        isNextPage={isNextPage}
        isPreviousPage={isPreviousPage}
        nextPage={nextPage}
        previousPage={previousPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllExpensesPage;