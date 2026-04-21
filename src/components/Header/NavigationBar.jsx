import React from 'react'
import { Nav, Navbar, NavDropdown, Button, Container } from 'react-bootstrap';
import { authActions } from '../../store/Slices/authSlice';
import { useDispatch } from 'react-redux'
import PremiumFeatures from '../PremiumFeatures';

function NavigationBar() {
    const dispatch = useDispatch();
    return (
        <Navbar expand="lg" className="bg-body-tertiary py-3">
            <Container fluid>
                <Navbar.Brand href="#">Day to Day Expenses</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Daily Expense</Nav.Link>
                        <Nav.Link href="#action2">Monthly Expense</Nav.Link>
                        <Nav.Link href="#action2">Yearly Expense</Nav.Link>
                                               
                    </Nav>
                    <PremiumFeatures/>
                    <Button onClick={() => {
                        dispatch(authActions.logout());
                    }}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavigationBar
