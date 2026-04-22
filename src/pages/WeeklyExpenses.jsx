import React from 'react'
import { useSelector } from 'react-redux'
import { getWeeklyExpenses } from '../utils/sort';


function WeeklyExpenses() {
    const expenseList = useSelector(state=>state.expense.list);

    const WeeklyExpenses = getWeeklyExpenses(expenseList);
    console.log("Inside daily expenses",WeeklyExpenses);
    return (
        <div>
        <ul>
            {WeeklyExpenses?.map(ele=>{
                return <li key={ele.id}>
                    <p>{ele.description}</p>
                    <p>{ele.amount}</p>
                </li>
            })}
        </ul>
        {WeeklyExpenses.length===0 && <p>No expense found</p>}
        </div>
        
    )
}

export default WeeklyExpenses
