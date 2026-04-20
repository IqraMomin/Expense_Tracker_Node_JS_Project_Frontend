import React,{useEffect, useState} from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addExpense } from '../store/Slices/expenseSlice';
import axios from 'axios';


function ExpenseForm() {
    const [description,setDescription] = useState("");
    const [amount,setAmount] = useState("");
    const [category,setCategory] = useState("");
    const [manualChange,setManualChange] = useState(false);
    const [showCategory,setShowCategory] = useState("");
    
    const dispatch = useDispatch();


    useEffect(()=>{
        if(!description) return;
        const timer = setTimeout(async()=>{
            console.log("Inside AI");
            const res = await axios.post(`http://localhost:3000/gemini/getCategories`,{
                prompt:description
            });
            setShowCategory(res.data.category);
            if(!manualChange){
                setCategory(res.data.category);
            }

        },500);

        return ()=>clearTimeout(timer);
    },[description])

    const handleChange=(e)=>{
        setDescription(e.target.value);

    }

    const resetExpenses = ()=>{
        setAmount("");
        setCategory("");
        setDescription("");
    }

    const formSubmitHandler = (e)=>{
        e.preventDefault();
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
                    value={amount}
                    onChange={(e)=>{
                        setAmount(e.target.value)
                    }} />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Description "
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="Description"
                    name='description'
                    value={description}
                    onChange={handleChange} />
                </FloatingLabel>
                <p variant="success">{showCategory}</p>
                <FloatingLabel controlId="floatingSelect" label="Expense Category">
                    <Form.Select aria-label="Floating label select example"
                    name='category' value={category}
                    onChange={(e)=>{
                        setManualChange(true);
                        setCategory(e.target.value)
                    }}
                    className='mb-3'>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>                       
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
