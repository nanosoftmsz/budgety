import "./App.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
const customBlue = blue["A400"];

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
        letterSpacing: 2,
      },
    },
  },
  palette: {
    primary: {
      main: customBlue,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App"></div>
    </ThemeProvider>
  );
};

export default App;
