import React from 'react'
import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import { authActions } from '../../store/Slices/authSlice';
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import "./NavigationBar.css"
import { FaCalendarDay, FaWallet, FaChartLine, FaSignOutAlt } from "react-icons/fa";


function NavigationBar() {
    const dispatch = useDispatch();
    return (
        <Navbar
        expand="lg"
        fixed="top"
        style={{ backgroundColor: "#1e293b" }}
        className="py-3 shadow-sm"
      >
        <Container fluid>
      
          <Navbar.Brand className="text-white fw-bold">
            Day to Day Expenses
          </Navbar.Brand>
      
          <Navbar.Toggle aria-controls="navbarScroll" />
      
          <Navbar.Collapse id="navbarScroll">
      
            <Nav
              className="me-auto my-2 my-lg-0 gap-3"
              navbarScroll
            >
      
              <Nav.Link
                as={NavLink}
                to="/welcome/allExpenses"
                activeClassName="active-link"
                className="text-white"
              >
                <FaWallet className="me-2" />
                All Expenses
              </Nav.Link>
      
              <Nav.Link
                as={NavLink}
                to="/welcome/dailyExpenses"
                activeClassName="active-link"
                className="text-white"
              >
                <FaCalendarDay className="me-2" />
                Daily Expenses
              </Nav.Link>
      
              <Nav.Link
                as={NavLink}
                to="/welcome/monthlyExpenses"
                activeClassName="active-link"
                className="text-white"
              >
                <FaChartLine className="me-2" />
                Monthly Expenses
              </Nav.Link>
      
            </Nav>
      
            <Button
              variant="danger"
              onClick={() => dispatch(authActions.logout())}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>
      
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}


export default NavigationBar
