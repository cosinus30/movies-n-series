import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { Navbar } from "./Components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { Movies } from "./Containers/Movies";
import { Series } from "./Containers/Series";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
            </div>
            <Switch>
                <Route exact path="/movies" component={Movies} />
                <Route exact path="/series" component={Series} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
