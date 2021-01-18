import React from "react";
import { Navbar } from "./Components/organisms/Navbar/Navbar";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { Movies } from "./pages/Movies";
import { Series } from "./pages/Series";
import { About } from "./pages/About";
import { MovieDetail } from "./Containers/MovieDetail/MovieDetail";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { QueryClientProvider, QueryClient } from "react-query";
const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 800,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            main: "#141414",
            dark: "#1F1F1F"
        },
        secondary: {
            main: "#D7D9D6",
        },
        text: {
            primary: "#D7D9D6",
        },
    },
});

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <div className="App">
                        <Navbar />
                    </div>
                    <Switch>
                        <Route path="/movies" component={Movies} />
                        <Route exact path="/series" component={Series} />
                        <Route exact path="/about" component={About} />
                    </Switch>
                    <Route path={"/movies/:id"} component={MovieDetail} />
                    <Route exact path="/" component={() => <Redirect to={"/movies"}/>}/>
                </QueryClientProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
