import "./App.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { NotificationContainer } from "react-notifications";
import MainApp from "./layout/MainApp";
import { UserContextProvider } from "./context/UserContext";
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
        <UserContextProvider>
          <MainApp />
        </UserContextProvider>
      </div>
      <NotificationContainer />
    </ThemeProvider>
  );
};

export default App;
