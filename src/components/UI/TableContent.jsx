import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../../store/Slices/expenseSlice';
import "./TableContent.css"

function TableContent({expenses}) {

    const dispatch = useDispatch();

    const deleteExpenseHandler = (id)=>{
        dispatch(deleteExpense(id));
    }
    return (
        <Table striped bordered="0" responsive hover className='table-content bg-light mt-3'>
            <thead>
            <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th> 
                <th>Notes</th>
                <th></th>              
            </tr>
            </thead>
            <tbody>
            {expenses?.map(expense=>{
                return <tr key={expense.id}>
                   <td>{expense.id}</td>
                   <td>{expense.createdAt}</td>
                   <td>{expense.description}</td>
                   <td>₹{expense.amount}</td>
                   <td>{expense.notes}</td>
                   <td>
                   <Button variant="danger"
                   onClick={()=>{deleteExpenseHandler(expense.id)}}>Delete Expense</Button>
                   </td>
                </tr>
            })}
            </tbody>
            
        </Table>
    )
}

export default TableContent
