import React,{useState} from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addExpense } from '../store/Slices/expenseSlice';

const initialExpenseData = {
    amount:"",description:"",category:""
}

function ExpenseForm() {
    const [expenseData,setExpenseData]=useState(initialExpenseData);
    const dispatch = useDispatch();

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setExpenseData(prev=>(
            {...prev,[name]:value}
        ))

    }

    const resetExpenses = ()=>{
        setExpenseData(initialExpenseData);
    }

    const formSubmitHandler = (e)=>{
        e.preventDefault();
        const {amount,description,category} = expenseData;
        const expense = {amount,description,category};
        dispatch(addExpense(expense));
        resetExpenses();
    }

    return (
        <div>
            <Form onSubmit={formSubmitHandler}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Expense Amount"
                    className="mb-3"
                >
                    <Form.Control type="number" placeholder="Expense Amount : "
                    name='amount'
                    value={expenseData.amount}
                    onChange={handleChange} />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Description "
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="Description"
                    name='description'
                    value={expenseData.description}
                    onChange={handleChange} />
                </FloatingLabel>
                <FloatingLabel controlId="floatingSelect" label="Expense Category">
                    <Form.Select aria-label="Floating label select example"
                    name='category' value={expenseData.category}
                    onChange={handleChange}
                    className='mb-3'>
                        <option value="food">Food</option>
                        <option value="utility">Utility</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="shopping">Shopping</option>
                    </Form.Select>
                </FloatingLabel>
                <div className='mb-3'>
                    <Button type="submit" variant='secondary'>Add Expense</Button>
                </div>

            </Form>

        </div>
    )
}

export default ExpenseForm
