import "./App.css";
import { useMemo } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { blue } from "@material-ui/core/colors";
import SignIn from "./pages/SignIn.page";
const customBlue = blue["A400"];

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createMuiTheme({
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
          type: prefersDarkMode ? "dark" : "light",

          primary: {
            main: customBlue,
          },
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SignIn />
      </div>
    </ThemeProvider>
  );
};

export default App;
