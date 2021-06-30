import "./App.css";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Login from "./pages/Login";
import TheNavbar from "./components/TheNavbar";
import Register from "./pages/Register";
import Home from "./pages/Home";
const customBlue = blue["A400"];

const App = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
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
      primary: {
        main: customBlue,
      },
      secondary: {
        main: "#ff9100",
      },

      background: {
        default: "#f5fcff",
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
        </Switch>
      </div>
    </ThemeProvider>
  );
};

export default App;
