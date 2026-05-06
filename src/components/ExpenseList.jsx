import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { deleteExpense } from '../store/Slices/expenseSlice';

function ExpenseList() {
    const expenseList = useSelector(state=>state.expense.list);
   
    return (
        <div>
            <ul>
                {expenseList?.map(ele=>{
                    return <li key={ele.id}>
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
