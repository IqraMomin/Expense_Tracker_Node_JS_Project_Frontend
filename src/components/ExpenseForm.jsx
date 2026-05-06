import React,{useEffect, useState} from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addExpense } from '../store/Slices/expenseSlice';
import { Row, Col, Card } from "react-bootstrap";
import axios from 'axios';
import "./ExpenseForm.css"


function ExpenseForm() {
    const [description,setDescription] = useState("");
    const [amount,setAmount] = useState("");
    const [category,setCategory] = useState("");
    const [manualChange,setManualChange] = useState(false);
    const [showCategory,setShowCategory] = useState("");
    const [notes,setNotes] = useState("");
    
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

        },1000);

        return ()=>clearTimeout(timer);
    },[description])

    const handleChange=(e)=>{
        setDescription(e.target.value);

    }

    const resetExpenses = ()=>{
        setAmount("");
        setCategory("");
        setDescription("");
        setNotes("");
    }

    const formSubmitHandler = (e)=>{
        e.preventDefault();
        const expense = {amount,description,category,notes};
        dispatch(addExpense(expense));
        resetExpenses();
    }

    return (       
        <Form onSubmit={formSubmitHandler}>
          <Card className="p-3 shadow-sm mt-5">
            <Row className="g-3">
        
              {/* Amount */}
              <Col xs={12} md={6} lg={2}>
                <FloatingLabel label="Expense Amount">
                  <Form.Control
                    type="number"
                    placeholder="Expense Amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
        
              {/* Description */}
              <Col xs={12} md={6} lg={3}>
                <FloatingLabel label="Description">
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </Col>
        
              {/* Category */}
              <Col xs={12} md={6} lg={3}>
                <FloatingLabel label="Expense Category">
                  <Form.Select
                    name="category"
                    value={category}
                    onChange={(e) => {
                      setManualChange(true);
                      setCategory(e.target.value);
                    }}
                  >
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
        
              {/* Notes */}
              <Col xs={12} md={6} lg={2}>
                <FloatingLabel label="Notes">
                  <Form.Control
                    type="text"
                    placeholder="Notes"
                    name="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
        
              {/* Button */}
              <Col xs={12} md={6} lg={2} className="d-flex align-items-end">
                <Button type="submit" variant="secondary" className="w-100">
                  Add Expense
                </Button>
              </Col>
        
            </Row>
        
            {/* Category preview */}
            <p className="mt-2">{showCategory}</p>
          </Card>
        </Form>
    )
}

export default ExpenseForm
