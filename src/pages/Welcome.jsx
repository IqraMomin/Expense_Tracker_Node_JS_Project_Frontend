import React from 'react'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import { Button } from 'react-bootstrap'
import Checkout from '../components/CheckOut'
import { authActions } from '../store/Slices/authSlice'

function Welcome() {
    return (
        <div>
            <Button onClick={()=>{
                authActions.logout();
                localStorage.removeItem("user");
            }}>Logout</Button>
            <Checkout/>
            <ExpenseForm/>
            <ExpenseList/>
            
        </div>
    )
}

export default Welcome
