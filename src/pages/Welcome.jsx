import React from "react";
import { Route, Switch } from "react-router-dom";

import ExpenseForm from "../components/ExpenseForm";
import Checkout from "../components/CheckOut";
import NavigationBar from "../components/Header/NavigationBar";

import DailyExpense from "./DailyExpense";
import WeeklyExpenses from "./WeeklyExpenses";
import MonthlyExpense from "./MonthlyExpense";
import AllExpensesPage from "../components/AllExpensesPage";

function Welcome() {
  return (
    <>
      <NavigationBar />

      {/* Optional global components */}
      <Checkout />
      <ExpenseForm />

      <Switch>
        <Route path="/welcome/allExpenses" component={AllExpensesPage} />
        <Route path="/welcome/dailyExpenses" component={DailyExpense} />
        <Route path="/welcome/weeklyExpenses" component={WeeklyExpenses} />
        <Route path="/welcome/monthlyExpenses" component={MonthlyExpense} />
      </Switch>
    </>
  );
}

export default Welcome;