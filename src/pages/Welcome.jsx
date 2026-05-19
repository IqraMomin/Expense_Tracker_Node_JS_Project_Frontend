import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ExpenseForm from "../components/ExpenseForm";
import Checkout from "../components/Checkout";
import NavigationBar from "../components/Header/NavigationBar";
import AllExpensesPage from "./AllExpensesPage";
import PremiumFeatures from "../components/PremiumFeatures";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import DailyExpense from "./DailyExpense";
import MonthlyExpense from "./MonthlyExpense";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { authActions } from "../store/Slices/authSlice";
import Cookies from "js-cookie";
function Welcome() {
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const isPremium = params.get("premium");
    if(isPremium==="true"){
      Cookies.set("isPremium","true");
      dispatch(authActions.setPremium(true));
    }
  },[location,dispatch])
  return (
    <>
      <NavigationBar />
      <Container fluid style={{ marginTop: "70px", minHeight: "100vh" }}>
        <Row>
          <Col xs={12} md={9} style={{ background: "aqua" }}>
            <Row>
              <Col xs={12} style={{ height: "30vh", background: "#f8f9fa" }}>
                <ExpenseForm />
              </Col>
              <Col xs={12} style={{ height: "70vh", background: "#dee2e6" }}>
               <Switch>
                  <Route path="/welcome" exact>
                    <Redirect to="/welcome/allExpenses" />
                  </Route>

                  <Route path="/welcome/allExpenses" component={AllExpensesPage} />
                  <Route path="/welcome/dailyExpenses" component={DailyExpense} />
                  <Route path="/welcome/monthlyExpenses" component={MonthlyExpense} />
                </Switch>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={3} className="mt-3 text-center">
            <Checkout />
            <PremiumFeatures />
          </Col>
        </Row>

      </Container>
    </>
  );
}



export default Welcome;