import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import TheNavbar from "./components/TheNavbar";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MonthlyExpenseList from "./pages/MonthlyExpenseList";
import IndividualMonthExpense from "./pages/IndividualMonthExpense";
import OwnedAndDebt from "./pages/OwnedAndDebt";
import DetailsOwnedAndDebt from "./components/OwnedAndDebt/DetailsOwnedAndDebt";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { UserContext } from "./context/UserContext";

export default function MainApp() {
  const { userInfo } = useContext(UserContext);
  return (
    <div>
      <TheNavbar />
      <Switch>
        {userInfo.userToken || localStorage.getItem("userToken") ? (
          <>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/monthly-expenditure" component={MonthlyExpenseList} />
            <Route exact path="/monthly-expenditure/:id" component={IndividualMonthExpense} />
            <Route exact path="/owned-and-debt" component={OwnedAndDebt} />
            <Route exact path="/owned-and-debt/:id" component={DetailsOwnedAndDebt} />
          </>
        ) : (
          <>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password" component={ResetPassword} />
          </>
        )}
      </Switch>
    </div>
  );
}
