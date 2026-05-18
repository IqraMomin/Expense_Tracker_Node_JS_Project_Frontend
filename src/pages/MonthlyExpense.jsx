import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearExpenses, fetchExpense } from "../store/Slices/expenseSlice";
import ShowExpenses from "../components/ShowExpenses";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Cookies from "js-cookie";

function MonthlyExpense() {
  const dispatch = useDispatch();

  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const currentDate = new Date();

const nextMonthDisabled =
  selectedMonth.getMonth() === currentDate.getMonth() &&
  selectedMonth.getFullYear() === currentDate.getFullYear();

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

  const isPremium = useSelector((state) => state.auth.isPremium);

  useEffect(() => {
    dispatch(clearExpenses());
  }, [dispatch]);

  // fetch monthly expenses
  useEffect(() => {
    if (isPremium) {
      const limit = Number(Cookies.get("itemsPerPage")) || 2;

      dispatch(
        fetchExpense({
          page: 1,
          limit,
          type: "monthly",
          date: selectedMonth.toISOString(),
        })
      );
    }
  }, [dispatch, selectedMonth, isPremium]);

  // handle empty page after delete
  useEffect(() => {
    if (
      isPremium &&
      !loading &&
      list.length === 0 &&
      currentPage > 1
    ) {
      const limit = Number(Cookies.get("itemsPerPage")) || 2;

      dispatch(
        fetchExpense({
          page: currentPage - 1,
          limit,
          type: "monthly",
          date: selectedMonth.toISOString(),
        })
      );
    }
  }, [
    list,
    currentPage,
    loading,
    dispatch,
    selectedMonth,
    isPremium,
  ]);

  // pagination
  const handlePageChange = (page) => {
    const limit = Number(Cookies.get("itemsPerPage")) || 2;

    dispatch(
      fetchExpense({
        page,
        limit,
        type: "monthly",
        date: selectedMonth.toISOString(),
      })
    );
  };

  // previous month
  const handlePreviousMonth = () => {
    const prev = new Date(selectedMonth);
    prev.setMonth(prev.getMonth() - 1);
    setSelectedMonth(prev);
  };

  // next month
  const handleNextMonth = () => {
    const next = new Date(selectedMonth);
    next.setMonth(next.getMonth() + 1);
  
    // prevent future months
    if (next > new Date()) return;
  
    setSelectedMonth(next);
  };

  return (
    <>
      {!isPremium && (
        <p className="text-center text-danger fw-bold mt-4 fs-4">
          🔒 Only For Premium Members
        </p>
      )}

      {isPremium && (
        <>
          {/* Month Navigator */}
          <div className="d-flex justify-content-center align-items-center gap-5 my-4">
            <FaChevronLeft
              style={{
                cursor: "pointer",
                fontSize: "22px",
              }}
              onClick={handlePreviousMonth}
            />

            <h2 className="m-0 fw-bold text-secondary">
              {selectedMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <FaChevronRight
              style={{
                cursor: nextMonthDisabled ? "not-allowed" : "pointer",
                opacity: nextMonthDisabled ? 0.5 : 1,
                fontSize: "22px",
              }}
              onClick={handleNextMonth}
            />
          </div>

          {/* Expenses */}
          <ShowExpenses
            list={list}
            currentPage={currentPage}
            isNextPage={isNextPage}
            isPreviousPage={isPreviousPage}
            nextPage={nextPage}
            previousPage={previousPage}
            loading={loading}
            error={error}
            handlePageChange={handlePageChange}
            expenseType="Monthly Expenses"
          />
        </>
      )}
    </>
  );
}

export default MonthlyExpense;