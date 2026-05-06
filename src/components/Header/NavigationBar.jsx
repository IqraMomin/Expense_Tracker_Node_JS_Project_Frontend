import React from 'react'
import { Nav, Navbar, NavDropdown, Button, Container } from 'react-bootstrap';
import { authActions } from '../../store/Slices/authSlice';
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import "./NavigationBar.css"
import { FaCalendarDay, FaCalendarAlt, FaChartLine, FaSignOutAlt } from "react-icons/fa";


function NavigationBar() {
    const dispatch = useDispatch();
    return (
        <Navbar expand="lg" fixed='top' style={{ backgroundColor: "greenyellow" }} className="bg-body-tertiary py-3">
            <Container fluid>
                <Navbar.Brand>Day to Day Expenses</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={NavLink} to="/welcome/allExpenses" activeClassName="active-link">All Expense</Nav.Link>
                        <Nav.Link as={NavLink} to="/welcome/dailyExpenses" activeClassName="active-link"><FaCalendarDay style={{ marginRight: "6px" }} />Daily Expense</Nav.Link>
                        <Nav.Link as={NavLink} to="/welcome/monthlyExpenses" activeClassName="active-link">Monthly Expense</Nav.Link>

                    </Nav>

                        
                        <Button
                            variant='danger'
                            onClick={() => {
                                dispatch(authActions.logout());
                            }}><FaSignOutAlt style={{marginRight:"5px"}}/>Logout</Button>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavigationBar
