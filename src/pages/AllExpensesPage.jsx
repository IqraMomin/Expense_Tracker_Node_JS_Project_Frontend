import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExpenses } from "../store/Slices/expenseSlice";
import ShowExpenses from "../components/ShowExpenses";
import { clearExpenses } from "../store/Slices/expenseSlice";
import Cookies from "js-cookie";

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
    dispatch(clearExpenses());
  }, [dispatch]);

  useEffect(() => {
    const limit = Number(Cookies.get("itemsPerPage")) || 2;
    dispatch(fetchAllExpenses({ page: 1, limit }));
  }, [dispatch]);

  useEffect(()=>{
    if(!loading && list.length===0 && currentPage>1){
      const limit = Number(Cookies.get("itemsPerPage")) || 2;
      dispatch(fetchAllExpenses({ page: currentPage-1, limit }));
    
    }
  },[list,currentPage,loading,dispatch]);


// this is your function 👇
const handlePageChange = (page) => {
  const limit = Number(Cookies.get("itemsPerPage")) || 2;
  dispatch(fetchAllExpenses({ page, limit }));
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
    expenseType="All Expenses"
    />
  );
};

export default AllExpensesPage;