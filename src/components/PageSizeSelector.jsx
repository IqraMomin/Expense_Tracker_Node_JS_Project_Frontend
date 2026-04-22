import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllExpenses } from "../store/Slices/expenseSlice";

const PageSizeSelector = () => {
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(5);

  // load saved preference
  useEffect(() => {
    const saved = Number(localStorage.getItem("itemsPerPage")) || 2;
    setLimit(saved);

    dispatch(fetchAllExpenses({ page: 1, limit: saved }));
  }, [dispatch]);

  const handleChange = (e) => {
    const value = Number(e.target.value);

    setLimit(value);
    localStorage.setItem("itemsPerPage", value);

    // always reset to page 1 (important)
    dispatch(fetchAllExpenses({ page: 1, limit: value }));
  };

  return (
    <div>
      <label>Items per page: </label>
      <select value={limit} onChange={handleChange}>
      <option value={2}>2</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default PageSizeSelector;