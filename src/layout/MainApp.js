import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Login from "../pages/Login";
import TheNavbar from "../components/Common/TheNavbar";
import Register from "../pages/Register";
import Home from "../pages/Home";
import MonthlyExpenseList from "../pages/MonthlyExpenseList";
import IndividualMonthExpense from "../pages/IndividualMonthExpense";
import OwnedAndDebt from "../pages/OwnedAndDebt";
import DetailsOwnedAndDebt from "../components/OwnedAndDebt/DetailsOwnedAndDebt";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
import OwnedList from "../pages/OwnedList";
import DebtList from "../pages/DebtList";

export default function MainApp() {
  const { userInfo } = useContext(UserContext);
  return (
    <div>
      <TheNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="/dashboard/owned-list" component={OwnedList} />
        <ProtectedRoute exact path="/dashboard/debt-list" component={DebtList} />
        <ProtectedRoute exact path="/monthly-expenditure" component={MonthlyExpenseList} />
        <ProtectedRoute exact path="/monthly-expenditure/:id" component={IndividualMonthExpense} />
        <ProtectedRoute exact path="/owned-and-debt" component={OwnedAndDebt} />
        <ProtectedRoute exact path="/owned-and-debt/:id" component={DetailsOwnedAndDebt} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
}
