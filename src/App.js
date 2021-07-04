import "./App.css";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
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
const customBlue = blue["A400"];

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    allVariants: {
      color: "#616161",
    },
  },
  shape: {
    borderRadius: 12,
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: "6px 6px 16px 6px",
        letterSpacing: 1,
        textTransform: "none",
      },
    },
  },
  palette: {
    // background: {
    //   default: "#f5fcff",
    // },
    primary: {
      main: customBlue,
    },
    secondary: {
      main: "#f50057",
    },
    success: {
      main: "#76ff03",
    },
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <UserContext.Provider value="hello">
          <TheNavbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/monthly-expenditure" component={MonthlyExpenseList} />
            <Route exact path="/monthly-expenditure/:id" component={IndividualMonthExpense} />
            <Route exact path="/owned-and-debt" component={OwnedAndDebt} />
            <Route exact path="/owned-and-debt/:id" component={DetailsOwnedAndDebt} />
          </Switch>
        </UserContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
