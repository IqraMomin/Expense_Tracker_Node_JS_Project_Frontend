import React from 'react'
import { useSelector } from 'react-redux'

function ExpenseList() {
    const expenseList = useSelector(state=>state.expense.list);
    return (
        <div>
            <ul>
                {expenseList.map(ele=>{
                    return <li>
                        <p>{ele.amount}</p>
                        <p>{ele.description}</p>
                        <p>{ele.category}</p>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default ExpenseList
