import React from 'react'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import { Button } from 'react-bootstrap'
import Checkout from '../components/CheckOut'
import { authActions } from '../store/Slices/authSlice'
import { useDispatch } from 'react-redux'
import PremiumFeatures from '../components/PremiumFeatures'

function Welcome() {
    const dispatch = useDispatch();
    return (
        <div>
            <Button onClick={()=>{
                dispatch(authActions.logout());
            }}>Logout</Button>
            <Checkout/>
            <ExpenseForm/>
            <ExpenseList/>
            <PremiumFeatures/>
            
        </div>
    )
}

export default Welcome
