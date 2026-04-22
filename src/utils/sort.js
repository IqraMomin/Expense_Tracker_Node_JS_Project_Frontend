export const getDailyExpenses = (expenseList) => {
    const today = new Date().toLocaleDateString("en-CA");
  
    return expenseList?.filter((expense) => {
      const expenseDate = new Date(expense.createdAt)
        .toLocaleDateString("en-CA");
  
      return expenseDate === today;
    });
  };

  export const getWeeklyExpenses = (expenseList) => {
    const now = new Date();
  
    // get start of week (Monday)
    const day = now.getDay(); // 0 (Sun) - 6 (Sat)
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  
    const startOfWeek = new Date(now.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
  
    return expenseList?.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);
      return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
    });
  };


  export const getMonthlyExpenses = (expenseList) => {
    const now = new Date();
  
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
  
    return expenseList?.filter((expense) => {
      const expenseDate = new Date(expense.createdAt);
  
      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    });
  };