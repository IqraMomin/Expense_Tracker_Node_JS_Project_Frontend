import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpense } from "../store/Slices/expenseSlice";
import ShowExpenses from "../components/ShowExpenses";

function MonthlyExpense() {

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
        const limit = Number(localStorage.getItem("itemsPerPage")) || 2;
        dispatch(fetchExpense({ page: 1, limit, type: "monthly" }));
    }, [dispatch]);

    useEffect(() => {
        if (!loading && list.length === 0 && currentPage > 1) {
            const limit = Number(localStorage.getItem("itemsPerPage")) || 2;
            dispatch(fetchExpense({ page: currentPage - 1, limit, type: "monthly" }));

        }
    }, [list, currentPage, loading, dispatch]);


    // this is your function 👇
    const handlePageChange = (page) => {
        const limit = Number(localStorage.getItem("itemsPerPage")) || 2;
        dispatch(fetchExpense({ page, limit, type: "monthly" }));
    };

    return (
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
    );
};


export default MonthlyExpense
