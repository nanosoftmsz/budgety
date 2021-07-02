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
const customBlue = blue["A400"];

const App = () => {
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
          borderRadius: 6,
          letterSpacing: 1,
          textTransform: "none",
        },
      },
    },
    palette: {
      background: {
        default: "#f5fcff",
      },
      primary: {
        main: customBlue,
      },
      secondary: {
        main: "#f50057",
      },
      pink: {
        main: "#ff9100",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TheNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/monthly-expenditure" component={MonthlyExpenseList} />
          <Route exact path="/monthly-expenditure/:id" component={IndividualMonthExpense} />
          <Route exact path="/owned-and-debt" component={OwnedAndDebt} />
        </Switch>
      </div>
    </ThemeProvider>
  );
};

export default App;
