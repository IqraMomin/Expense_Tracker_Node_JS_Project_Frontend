import React from 'react'
import { useSelector } from 'react-redux'
import { getDailyExpenses } from '../utils/sort';
import { CSVLink } from 'react-csv';

function DailyExpense() {
    const expenseList = useSelector(state=>state.expense.list);

    const dailyExpenses = getDailyExpenses(expenseList);
    console.log("Inside daily expenses",dailyExpenses);
    const headers = [
        {label:"ID",key:"id"},
        {label:"Date",key:"createdAt"},
        {label:"Amount",key:"amount"},
        {label:"Description",key:"description"}
        ]
    return (
        <div>
        <ul>
            {dailyExpenses?.map(ele=>{
                return <li key={ele.id}>
                    <p>{ele.description}</p>
                    <p>{ele.amount}</p>
                </li>
            })}
        </ul>
        {dailyExpenses.length===0 && <p>No expense found</p>}
        <CSVLink data={dailyExpenses}
        headers={headers}
        >Download CSV</CSVLink>
        </div>
        
        
    )
}

export default DailyExpense
