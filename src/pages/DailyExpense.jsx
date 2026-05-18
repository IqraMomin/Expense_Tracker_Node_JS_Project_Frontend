import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearExpenses, fetchExpense } from "../store/Slices/expenseSlice";
import ShowExpenses from "../components/ShowExpenses";
import Cookies from "js-cookie";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const DailyExpense = () => {

  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] =
    useState(new Date());

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

  const isPremium = useSelector(
    (state) => state.auth.isPremium
  );

  useEffect(() => {
    dispatch(clearExpenses());
  }, [dispatch]);

  // fetch daily expenses
  useEffect(() => {

    if (isPremium) {

      const limit =
        Number(
          Cookies.get("itemsPerPage")
        ) || 2;

      dispatch(
        fetchExpense({
          page: 1,
          limit,
          type: "daily",
          date:
            selectedDate.toISOString(),
        })
      );
    }

  }, [
    isPremium,
    dispatch,
    selectedDate,
  ]);

  // handle empty page after delete
  useEffect(() => {

    if (
      isPremium &&
      !loading &&
      list.length === 0 &&
      currentPage > 1
    ) {

      const limit =
        Number(
          Cookies.get("itemsPerPage")
        ) || 2;

      dispatch(
        fetchExpense({
          page: currentPage - 1,
          limit,
          type: "daily",
          date:
            selectedDate.toISOString(),
        })
      );
    }

  }, [
    isPremium,
    list,
    currentPage,
    loading,
    dispatch,
    selectedDate,
  ]);

  // pagination
  const handlePageChange = (page) => {

    const limit =
      Number(
        Cookies.get("itemsPerPage")
      ) || 2;

    dispatch(
      fetchExpense({
        page,
        limit,
        type: "daily",
        date:
          selectedDate.toISOString(),
      })
    );
  };

  // previous day
  const handlePreviousDay = () => {

    const prev = new Date(
      selectedDate
    );

    prev.setDate(
      prev.getDate() - 1
    );

    setSelectedDate(prev);
  };

  // next day
  const handleNextDay = () => {

    if (nextDayDisabled) return;

    const next = new Date(
      selectedDate
    );

    next.setDate(
      next.getDate() + 1
    );

    setSelectedDate(next);
  };

  // disable future days
  const currentDate = new Date();

  const nextDayDisabled =
    selectedDate.toDateString() ===
    currentDate.toDateString();

  return (
    <>

      {!isPremium && (
        <p className="text-center text-danger fw-bold mt-4 fs-4">
          🔒 Only For Premium Members
        </p>
      )}

      {isPremium && (
        <div>

          {/* Day Navigator */}
          <div
            className="
              d-flex
              justify-content-center
              align-items-center
              gap-5
              my-4
            "
          >

            {/* Left Arrow */}
            <FaChevronLeft
              style={{
                cursor: "pointer",
                fontSize: "22px",
              }}
              onClick={
                handlePreviousDay
              }
            />

            {/* Selected Date */}
            <h2
              className="
                m-0
                fw-bold
                text-secondary
              "
            >
              {selectedDate.toLocaleDateString(
                "default",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </h2>

            {/* Right Arrow */}
            <FaChevronRight
              style={{
                cursor:
                  nextDayDisabled
                    ? "not-allowed"
                    : "pointer",

                opacity:
                  nextDayDisabled
                    ? 0.5
                    : 1,

                fontSize: "22px",
              }}

              onClick={
                handleNextDay
              }
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
            handlePageChange={
              handlePageChange
            }
            expenseType="Daily Expenses"
          />

        </div>
      )}

    </>
  );
};

export default DailyExpense;