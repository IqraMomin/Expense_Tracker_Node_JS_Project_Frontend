import React from 'react'
import { useSelector } from 'react-redux'
import { getMonthlyExpenses } from '../utils/sort';

function MonthlyExpense() {


    const expenseList = useSelector(state => state.expense.list);

    const monthlyExpenses = getMonthlyExpenses(expenseList);
    console.log("Inside monthly expenses", monthlyExpenses);
    return (
        <div>
            <ul>
                {monthlyExpenses?.map(ele => {
                    return <li key={ele.id}>
                        <p>{ele.description}</p>
                        <p>{ele.amount}</p>
                    </li>
                })}
            </ul>
            {monthlyExpenses.length === 0 && <p>No expense found</p>}
        </div>

    )
}

export default MonthlyExpense
